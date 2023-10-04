import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { DataStorage } from 'src/services/data-storage.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  clickedOnNav: boolean;
  clickedOnLogout: boolean = false;

  constructor(
    private router: Router,
    private account: AccountService,
    private dataStorage: DataStorage,
    private state: State
  ) {}

  userNavigate(e: HTMLAnchorElement) {
    this.clickedOnLogout = true;

    if (e.className === 'logout--no') {
      this.clickedOnLogout = false;
    }

    if (e.className === 'logout--yes') {
      // logouts user
      this.account.logout(null);

      // delete cache
      this.dataStorage.deleteCacheDataOnLogout();
      this.state.onLogOutClearData();

      // navigate to hero
      this.router.navigate(['']);
      this.clickedOnLogout = false;
    }
  }
}
