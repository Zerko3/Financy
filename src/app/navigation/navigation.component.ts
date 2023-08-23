import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  clickedOnNav: boolean;
  clickedOnLogout: boolean = false;

  constructor(private router: Router) {}

  userNavigate(e: HTMLAnchorElement) {
    if (e.innerText === 'Overview') {
      this.router.navigate(['dashboard']);

      this.clickedOnNav = false;
    }

    if (e.innerText === 'Investing') {
      this.router.navigate(['/investing']);
    }

    if (e.innerText === 'Monthly expenses') {
      this.router.navigate(['/expense']);
    }

    if (e.innerText === 'Saveings') {
      this.router.navigate(['/saveings']);
    }

    if (e.innerText === 'Logout') {
      this.clickedOnLogout = true;
    }

    if (e.innerText === 'No') {
      this.clickedOnLogout = false;
    }

    if (e.innerText === 'Yes') {
      this.router.navigate(['']);
      this.clickedOnLogout = false;
    }
  }
}
