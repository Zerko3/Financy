import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Carousel } from 'src/interfaces/carousel.interface';
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
    this.router.navigate(['/dashboard']);
  }
}
