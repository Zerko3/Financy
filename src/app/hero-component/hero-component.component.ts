import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-component',
  templateUrl: './hero-component.component.html',
  styleUrls: ['./hero-component.component.scss'],
})
export class HeroComponentComponent {
  constructor(private router: Router) {}

  userHeroNavigation(e: HTMLAnchorElement) {
    if (e.textContent === 'Login') {
      this.router.navigate(['/login']);
    }

    if (e.textContent === 'Register') {
      this.router.navigate(['/register']);
    }
  }
}
