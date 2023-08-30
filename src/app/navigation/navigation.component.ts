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
    this.clickedOnLogout = true;
    console.log(e.className);

    if (e.className === 'logout--no') {
      this.clickedOnLogout = false;
    }

    if (e.className === 'logout--yes') {
      this.router.navigate(['']);
      this.clickedOnLogout = false;
    }
  }
}
