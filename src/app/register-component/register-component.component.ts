import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountService } from 'src/services/account.service';
import { RegisterService } from 'src/services/register.service';
import { Carousel } from 'src/interfaces/carousel.interface';
import { DataStorage } from 'src/services/data-storage.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
})
export class RegisterComponentComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  @ViewChild('navigationLogin')
  navigationLogin: ElementRef;
  @ViewChild('navigationHome') navigationHome: ElementRef;

  formStatus: boolean = false;
  username: string = '';
  accountType: string = '';
  email: string = '';
  password: string = '';
  userCarouselArray: Carousel[] = [];
  slideshowDelay: number = 2000;
  clickedOnRadio: boolean = false;
  isToastVisible: boolean = false;
  type: string = '';
  message: string = '';
  errorStatus: boolean = false;
  registerStatus: boolean = false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private registerService: RegisterService,
    private dataStorage: DataStorage
  ) {}

  ngOnInit(): void {
    this.userCarouselArray = this.registerService.carouselArray;
  }

  userHeroNavigation(e: HTMLAnchorElement) {
    if (e.innerText === 'Login') {
      this.router.navigate(['/login']);
    }

    if (e.innerText === 'Back') {
      this.router.navigate(['']);
    }
  }

  onSubmit(e: NgForm) {
    this.username = e.value.username;
    this.email = e.value.email;
    this.accountType = e.value.accType;
    this.password = e.value.password;

    // create new Account
    const newUser = new Account(
      this.username,
      this.email,
      this.accountType,
      this.password
    );

    // pass the username into the firebase to create a link for the api
    this.dataStorage.getCorrectUser(newUser.username);

    // pass the username into service to store it to display it in objects and on DOM
    this.registerService.storeUsername(newUser.username);

    this.accountService.singupUser(newUser).subscribe(
      (responseData) => {
        this.registerStatus = true;

        this.dataStorage.userIsRegistered(this.registerStatus);

        // pass account to register service
        this.registerService.storeRegisterAccount(this.registerStatus);

        if (e.form.status === 'VALID') {
          // toast
          this.isToastVisible = true;
          this.type = 'success';
          this.message = `You have registered. Welcome!`;

          // reset the form
          e.resetForm();

          // navigate to dashboard
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        }
      },
      (error) => {
        console.log(error);
        this.isToastVisible = true;
        this.type = error ? 'error' : 'success';

        // error msg for better UX
        this.message = `Invalid user credentials. Please try again.`;

        this.errorStatus = true;

        // handle error messaging and redirection in here
        if (this.errorStatus) {
          // reset form and navigate back to register
          e.resetForm();
          this.router.navigate(['/register']);
        }
        return;
      }
    );
  }
}
