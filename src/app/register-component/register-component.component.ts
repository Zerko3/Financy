import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
})
export class RegisterComponentComponent {
  @ViewChild('navigationLogin') navigationLogin: ElementRef;
  @ViewChild('navigationHome') navigationHome: ElementRef;
  constructor(private router: Router) {}
  userHeroNavigation(e: HTMLAnchorElement) {
    if (e.innerText === 'Login') {
      this.router.navigate(['/login']);
    }

    if (e.innerText === 'Back') {
      this.router.navigate(['']);
    }
  }

  // TODO:
  // form validation
}
