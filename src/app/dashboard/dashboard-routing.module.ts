import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/auth/auth.guard';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { DashboardComponent } from './dashboard.component';
import { ExpenseFormComponent } from './expense/expense-form/expense-form.component';
import { ExpenseComponent } from './expense/expense.component';
import { InvestingFormComponent } from './investing/investing-form/investing-form.component';
import { InvestingComponent } from './investing/investing.component';
import { SaveingsFormComponent } from './saveings/saveings-form/saveings-form.component';
import { SaveingsComponent } from './saveings/saveings.component';
import { WildcardComponentComponent } from '../wildcard-component/wildcard-component.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'createCard',
        component: BankAccountComponent,
      },
    ],
  },
  {
    path: 'expense',
    component: ExpenseComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'expenseForm', component: ExpenseFormComponent }],
  },
  {
    path: 'investing',
    component: InvestingComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'investingForm', component: InvestingFormComponent }],
  },
  {
    path: 'saveings',
    component: SaveingsComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'saveingsForm', component: SaveingsFormComponent }],
  },
  { path: '**', component: WildcardComponentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
