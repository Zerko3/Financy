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

  errorStatus: boolean = false;
  isToastVisible: boolean = false;
  type: string = '';
  message: string = '';

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
  // 5. Create interface to be typesafe
  onSubmit(e: NgForm) {
    this.userAccount = {
      email: e.form.value.email,
      password: e.form.value.password,
    };

    // how to get username out of the Acount?
    this.loginService.storeUsername(this.userAccount.email);

    this.accountService.loginUser(this.userAccount).subscribe(
      (data) => {
        console.log(data);

        // handle valid data in here
        if (e.form.status === 'VALID') {
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

          // do i need to do something with the data from the user in here?
          // ...
        }
        return;
      },
      (error) => {
        // TODO:
        // 1. Add toast or other visual indication in here
        this.isToastVisible = true;
        this.type = error ? 'error' : 'success';
        this.message = `Invalid user credentials. Please try again.`;
        this.errorStatus = true;

        // handle error messaging and redirection in here
        if (this.errorStatus) {
          console.log('ERROR WAS TRUE');

          // reset form and navigate back to login
          e.resetForm();
          this.router.navigate(['/login']);
        }
        return;
      }
    );
  }
}
