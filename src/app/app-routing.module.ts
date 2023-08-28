import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './dashboard/expense/expense.component';
import { InvestingComponent } from './dashboard/investing/investing.component';
import { SaveingsComponent } from './dashboard/saveings/saveings.component';
import { WildcardComponentComponent } from './wildcard-component/wildcard-component.component';
import { ExpenseFormComponent } from './dashboard/expense/expense-form/expense-form.component';
import { InvestingFormComponent } from './dashboard/investing/investing-form/investing-form.component';
import { SaveingsFormComponent } from './dashboard/saveings/saveings-form/saveings-form.component';
import { BankAccountComponent } from './dashboard/bank-account/bank-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: 'hero', component: HeroComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{ path: 'createCard', component: BankAccountComponent }],
  },
  {
    path: 'expense',
    component: ExpenseComponent,
    children: [{ path: 'expenseForm', component: ExpenseFormComponent }],
  },
  {
    path: 'investing',
    component: InvestingComponent,
    children: [{ path: 'investingForm', component: InvestingFormComponent }],
  },
  {
    path: 'saveings',
    component: SaveingsComponent,
    children: [{ path: 'saveingsForm', component: SaveingsFormComponent }],
  },

  { path: '**', component: WildcardComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
