import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';

import { AuthGuard } from 'src/auth/auth.guard';
import { ExpenseFormComponent } from './dashboard/expense/expense-form/expense-form.component';
import { ExpenseComponent } from './dashboard/expense/expense.component';
import { InvestingFormComponent } from './dashboard/investing/investing-form/investing-form.component';
import { InvestingComponent } from './dashboard/investing/investing.component';
import { SaveingsFormComponent } from './dashboard/saveings/saveings-form/saveings-form.component';
import { SaveingsComponent } from './dashboard/saveings/saveings.component';

const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: 'hero', component: HeroComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },

  // lazy loading dashboard modules
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },

  {
    path: 'expense',
    canActivate: [AuthGuard],
    component: ExpenseComponent,
    children: [{ path: 'expenseForm', component: ExpenseFormComponent }],
  },

  {
    path: 'investing',
    canActivate: [AuthGuard],
    component: InvestingComponent,
    children: [{ path: 'investingForm', component: InvestingFormComponent }],
  },
  {
    path: 'saveings',
    canActivate: [AuthGuard],
    component: SaveingsComponent,
    children: [{ path: 'saveingsForm', component: SaveingsFormComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
