import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData } from 'src/interfaces/authResponse.interface';
import { Carousel } from 'src/interfaces/carousel.interface';
import { Login } from 'src/interfaces/login.interface';
import { AccountService } from 'src/services/account.service';
import { DataStorage } from 'src/services/data-storage.service';
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
    username: '',
    password: '',
  };

  errorStatus: boolean = false;
  isToastVisible: boolean = false;
  type: string = '';
  message: string = '';
  loginValid: boolean = false;
  userClickedOnDemo: boolean = false;
  userLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService,
    private dataStorage: DataStorage
  ) {}

  ngOnInit(): void {
    this.userCarouselArray = this.loginService.carouselArray;
  }

  // allows user to navigate via router
  userHeroNavigation(e: any) {
    if (e.target.textContent === 'Register') {
      this.router.navigate(['/register']);
    }

    if (e.target.textContent === 'Back') {
      this.router.navigate(['']);
    }
  }

  // allow the user to use demo
  onClickDemo() {
    this.userClickedOnDemo = true;
  }

  // get valid data from from
  onSubmit(e: NgForm) {
    // this will pass you on with the demo account
    if (this.userClickedOnDemo) {
      this.userAccount = {
        email: 'admin@admin.admin',
        username: 'admin',
        password: 'admin123',
      };
    } else {
      this.userAccount = {
        email: e.form.value.email,
        username: e.form.value.username,
        password: e.form.value.password,
      };
    }

    // pass the userLoggedin boolean to service
    this.dataStorage.userIsLoggedInButNoDataOnDom(this.userLoggedIn);

    // get username to dashboard
    this.loginService.storeUsername(this.userAccount.username);

    // get user info from firebase -> pass data in and see if its true
    this.accountService.loginUser(this.userAccount).subscribe(
      (data: AuthResponseData) => {
        this.loginValid = true;

        // auth guard -> needs to be true to be able to use app
        this.loginService.userLoggedIn(this.loginValid);

        // handle valid data in here
        if (e.form.status === 'VALID' || this.userClickedOnDemo) {
          // pass username to service to render on DOM
          this.loginService.storeUsername(this.userAccount.username);

          // toast
          this.isToastVisible = true;
          this.type = 'success';
          this.message = `Logged in. Welcome!`;

          // reset the form
          e.resetForm();

          // navigate to dashboard
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        }
        return;
      },
      (error) => {
        this.isToastVisible = true;
        this.type = error ? 'error' : 'success';
        this.message = `Invalid user credentials. Please try again.`;
        this.errorStatus = true;

        // handle error messaging and redirection in here
        if (this.errorStatus) {
          // reset form and navigate back to login
          e.resetForm();
          this.router.navigate(['/login']);
        }
        return;
      }
    );
  }
}
