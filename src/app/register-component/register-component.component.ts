import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
})
export class RegisterComponentComponent {
  constructor(private router: Router) {}
  userHeroNavigation() {
    this.router.navigate(['']);
  }

  // TODO:
  // form validation
}
