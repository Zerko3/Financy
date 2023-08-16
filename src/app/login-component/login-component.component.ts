import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent {
  constructor(private router: Router) {}
  userHeroNavigation() {
    this.router.navigate(['']);
  }
}
