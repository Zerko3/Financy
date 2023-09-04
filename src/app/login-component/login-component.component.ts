import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Carousel } from 'src/interfaces/carousel.interface';
import { Login } from 'src/interfaces/login.interface';
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
    username: '',
    password: '',
  };
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.userCarouselArray = this.loginService.carouselArray;
  }

  userHeroNavigation() {
    this.router.navigate(['']);
  }

  // TODO:
  // form validation

  onSubmit(e: NgForm) {
    // TODO:
    // for now its just this. will add logic after firebase
    // check backend for valid data

    this.userAccount = {
      username: e.form.value.username,
      password: e.form.value.password,
    };

    this.loginService.storeUsername(this.userAccount.username);

    if (e.form.status === 'VALID') {
      this.router.navigate(['/dashboard']);
    }
    return;
  }
}
