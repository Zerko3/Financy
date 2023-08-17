import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
})
export class RegisterComponentComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  @ViewChild('navigationLogin')
  navigationLogin: ElementRef;
  @ViewChild('navigationHome') navigationHome: ElementRef;
  formStatus: boolean = false;
  username: string = '';
  accountType: string = '';
  email: string = '';
  constructor(private router: Router, private accountService: AccountService) {}

  userHeroNavigation(e: HTMLAnchorElement) {
    if (e.innerText === 'Login') {
      this.router.navigate(['/login']);
    }

    if (e.innerText === 'Back') {
      this.router.navigate(['']);
    }
  }

  onSubmit(e: NgForm) {
    this.username = e.value.username;
    this.email = e.value.email;
    this.accountType = e.value.accType;

    // create new Account
    const newUser = new Account(this.username, this.email, this.accountType);

    this.accountService.getNewAccounts(newUser);

    // only temporary -> after building I will do auth and then go to dashboard
    this.router.navigate(['/dashboard']);
  }
}
