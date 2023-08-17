import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent {
  formStatus: boolean = false;
  constructor(private router: Router) {}
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
