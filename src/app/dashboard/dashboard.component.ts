import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, take } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { Expense } from 'src/interfaces/expense.interface';
import { Investing } from 'src/interfaces/investing.interface';
import { OverviewExpense } from 'src/interfaces/overviewExpenses.interface';
import { Saveings } from 'src/interfaces/saveings.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { ExpenseService } from 'src/services/expense.service';
import { InvestingService } from 'src/services/investing.service';
import { LoginService } from 'src/services/login.service';
import { SaveingsService } from 'src/services/saveings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('navigation') addCards: ElementRef;
  bankCardsArray: BankAccount[] = [];
  expenseData: Expense[] = [];
  savingsData: Saveings[] = [];
  investingData: Investing[] = [];
  subscriptionArray: Expense[] = [];
  investedMoney: number = 0;
  savedMoney: number = 0;
  positiveMoney: number = 0;
  bankCardSubscribe: Subscription;
  expenseSubscription: Subscription;
  saveingSubscription: Subscription;
  clickOnNavigation: boolean = false;
  clickedOnDeleteButton: boolean = false;
  correctCard: string = '';
  username: string;

  overviewExpenses: [OverviewExpense, OverviewExpense] = [
    { typeOfExpense: 'positive', val: 0 },
    { typeOfExpense: 'negative', val: 0 },
  ];

  constructor(
    private expenseService: ExpenseService,
    private saveingService: SaveingsService,
    private investingService: InvestingService,
    private bankCardService: BankCardService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('The init started - DASHBOARD');

    this.username = this.loginService.getUsername();
    this.bankCardsArray = this.bankCardService.getBankCard();
    this.expenseData = this.expenseService.getExpenseData();

    this.subscriptionArray = this.expenseService.getSubscriptionData();

    this.savingsData = this.saveingService.getSaveingsData();

    this.investingData = this.investingService.getInvestingData();

    // overwrite the val in obj
    this.investedMoney += this.investingService.totalInvestment;
    this.savedMoney += this.saveingService.totalMoneySaved;
    this.positiveMoney = this.investedMoney + this.savedMoney;

    // 0 is positive
    this.overviewExpenses[0].val = this.positiveMoney;

    // 1 is negative
    this.overviewExpenses[1].val += this.expenseService.totalExpense;

    // create card
    this.bankCardSubscribe = this.bankCardService.bankCardSubscribe.subscribe(
      (data) => {
        this.bankCardsArray.push(data);

        return this.bankCardsArray;
      }
    );

    // TODO:
    // 1. Bug is present if i have saveing and spending cards present

    this.expenseSubscription = this.expenseService.dataSubject
      .pipe(take(1))
      .subscribe((data) => {
        // get ID
        let newMoney = 0;
        for (const card of this.bankCardsArray) {
          // match ID and if ID === ID than deduct money
          if (card.bankAccountCustomName === data.ID) {
            newMoney = card.bankMoneyStatus - data.money;
            card.bankMoneyStatus = newMoney;
            break;
          }
        }
        return this.bankCardsArray;
      });

    // bug not working like it should -> why -> mby because the array has both the spending and saveing cards?
    this.saveingSubscription = this.saveingService.saveing
      .pipe(take(1))
      .subscribe((data) => {
        // get ID
        let newMoney = 0;
        for (const card of this.bankCardsArray) {
          // match ID and if ID === ID than deduct money
          if (card.bankAccountCustomName === data.ID) {
            newMoney = card.bankMoneyStatus + data.amountOfMoneySaved;
            card.bankMoneyStatus = newMoney;
            break;
          }
        }
        return this.bankCardsArray;
      });
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - DASHBOARD');

    this.bankCardSubscribe.unsubscribe();
  }

  onUserNavigate(e) {
    console.log(e.target.textContent);
    if (e.target.textContent === 'Add cards') {
      this.router.navigate(['dashboard/createCard']);
    }

    if (e.target.textContent === 'Add subscription') {
      this.router.navigate(['expense/expenseForm']);
    }

    if (e.target.textContent === 'Add transaction') {
      this.router.navigate(['expense/expenseForm']);
    }
  }

  onClickForDelete(e: any) {
    console.log(e);
    this.clickedOnDeleteButton = !this.clickedOnDeleteButton;

    this.correctCard = e;
  }

  onCardClick(e) {
    // 1. Get the correct card
    const testData = e.target.offsetParent;
    // 2. Remove card from array
    for (const card of this.bankCardsArray) {
      if (testData.getAttribute('data-card-id') === card.ID) {
        let index = this.bankCardsArray.indexOf(card);
        this.bankCardsArray.splice(index, 1);

        break;
      }
    }

    this.bankCardService.overwriteBankCardsArray(this.bankCardsArray);
    return this.bankCardsArray;
  }
}
