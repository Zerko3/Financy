import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  distinctUntilChanged,
  take,
  takeUntil,
} from 'rxjs';
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
import { State } from 'src/services/state.service';

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

  clickOnNavigation: boolean = false;
  clickedOnDeleteButton: boolean = false;
  correctCard: string = '';
  username: string;

  overviewExpenses: [OverviewExpense, OverviewExpense] = [
    { typeOfExpense: 'positive', val: 0 },
    { typeOfExpense: 'negative', val: 0 },
  ];

  // testing

  private destroy: Subscription;
  bankCardSubscribe: Subscription;
  expenseSubscription: Subscription;
  saveingSubscription: Subscription;

  constructor(
    private state: State,
    private expenseService: ExpenseService,
    private saveingService: SaveingsService,
    private investingService: InvestingService,
    private bankCardService: BankCardService,
    private loginService: LoginService,
    private router: Router
  ) {}

  // TODO:
  // 1. There is a strange bug that casts multiple subject calls when calling different saveing or spending cards

  ngOnInit(): void {
    console.log('The init started - DASHBOARD');

    this.username = this.loginService.getUsername();

    this.bankCardsArray = this.state.getBankCard();
    this.expenseData = this.state.getExpenseData();

    this.subscriptionArray = this.state.getSubscriptionData();

    this.savingsData = this.state.getSaveingsData();

    this.investingData = this.state.getInvestingData();

    // overwrite the val in obj
    this.investedMoney += this.investingService.totalInvestment;
    this.savedMoney += this.saveingService.totalMoneySaved;
    this.positiveMoney = this.investedMoney + this.savedMoney;

    // 0 is positive
    this.overviewExpenses[0].val = this.positiveMoney;

    // 1 is negative
    this.overviewExpenses[1].val += this.expenseService.totalExpense;

    this.bankCardSubscribe = this.state.bankCardSubscribe.subscribe((data) => {
      this.bankCardsArray.push(data);

      return this.bankCardsArray;
    });

    // SOME RANDOM BUGS ARE STILL PRESENT -> FOR EXAMPLE IF YOU CREATE A NEW CARD LATER ON AS A SAVEINGS IT WILL GET MORE MONEY WHEN YOU ADD MONEY TO SAVEINGS (SO IF I HAD 3 TRANSACTIONS PRIOR TO CREATING THE NEW CARD IT WILL GO 3 X WHAT AMOUT I INPUTED -> WHY AND HOW)
    this.expenseSubscription = this.state.dataSubject
      .pipe(take(1))
      .subscribe((data) => {
        console.log('spending subject started');
        // get ID
        let newMoney = 0;
        for (const card of this.bankCardsArray) {
          // match ID and if ID === ID than deduct money
          if (card.bankAccountCustomName === data.ID) {
            console.log(
              `The card ID: ${data.ID} is the same as the card name: ${card.bankAccountCustomName}`
            );
            newMoney = card.bankMoneyStatus - data.money;
            card.bankMoneyStatus = newMoney;
            console.log(card);
            console.log(this.bankCardsArray);

            break;
          }
        }
        // IS THIS EVEN A GOOD PRACTICE
        // call a service method
        this.state.overwriteBankCardsArray(this.bankCardsArray);
        // SHOULD THIS RETURN BE COMMENTED OUT?
        return this.bankCardsArray;
      });

    // SOME RANDOM BUGS ARE STILL PRESENT -> FOR EXAMPLE IF YOU CREATE A NEW CARD LATER ON AS A SAVEINGS IT WILL GET MORE MONEY WHEN YOU ADD MONEY TO SAVEINGS (SO IF I HAD 3 TRANSACTIONS PRIOR TO CREATING THE NEW CARD IT WILL GO 3 X WHAT AMOUT I INPUTED -> WHY AND HOW)
    this.destroy = this.state.saveing.pipe(take(1)).subscribe((data) => {
      console.log('saveing subject started');
      // get ID
      let newMoney = 0;
      for (const card of this.bankCardsArray) {
        // match ID and if ID === ID than deduct money
        if (card.bankAccountCustomName === data.ID) {
          console.log(
            `The card ID: ${data.ID} is the same as the card name: ${card.bankAccountCustomName}`
          );
          newMoney = card.bankMoneyStatus + data.amountOfMoneySaved;
          card.bankMoneyStatus = newMoney;
          console.log(card);
          break;
        }
      }
      // IS THIS EVEN A GOOD PRACTICE
      // call a service method
      this.state.overwriteBankCardsArray(this.bankCardsArray);
      return this.bankCardsArray;
    });
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - DASHBOARD');
    this.bankCardSubscribe.unsubscribe();
    // this.destroy.unsubscribe();
    // this.expenseSubscription.unsubscribe();
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

    this.state.overwriteBankCardsArray(this.bankCardsArray);
    return this.bankCardsArray;
  }
}
