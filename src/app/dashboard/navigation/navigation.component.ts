import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  clickedOnNav: boolean;

  constructor(private router: Router) {}

  userNavigate(e: HTMLAnchorElement) {
    if (e.innerText === 'Overview') {
      this.router.navigate(['dashboard']);

      this.clickedOnNav = false;
    }

    if (e.innerText === 'Investing') {
      this.router.navigate(['dashboard/investing']);
    }

    if (e.innerText === 'Monthly expenses') {
      this.router.navigate(['dashboard/expense']);
    }

    if (e.innerText === 'Saveings') {
      this.router.navigate(['dashboard/saveings']);
    }
  }
}
