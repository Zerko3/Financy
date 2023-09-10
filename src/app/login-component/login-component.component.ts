import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Carousel } from 'src/interfaces/carousel.interface';
import { Login } from 'src/interfaces/login.interface';
import { AccountService } from 'src/services/account.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  formStatus: boolean = false;
  userCarouselArray: Carousel[] = [];
  slideshowDelay: number = 2000;
  userAccount: Login = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.userCarouselArray = this.loginService.carouselArray;
  }

  userHeroNavigation(e: any) {
    if (e.target.textContent === 'Register') {
      this.router.navigate(['/register']);
    }

    if (e.target.textContent === 'Back') {
      this.router.navigate(['']);
    }
  }

  // TODO:
  // form validation

  // TODO:
  // 1. Get username and display username in hello
  // 2. Validate the user credantials in firebase
  // 3. Redirect to app if valid username and password and form
  // 4. Else display error message
  onSubmit(e: NgForm) {
    // TODO:
    // for now its just this. will add logic after firebase
    // check backend for valid data

    this.userAccount = {
      email: e.form.value.email,
      password: e.form.value.password,
    };

    this.loginService.storeUsername(this.userAccount.email);

    this.accountService.loginUser(this.userAccount).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    if (e.form.status === 'VALID') {
      this.router.navigate(['/dashboard']);
    }
    return;
  }
}
