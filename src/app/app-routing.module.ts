import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './dashboard/expense/expense.component';
import { InvestingComponent } from './dashboard/investing/investing.component';
import { SaveingsComponent } from './dashboard/saveings/saveings.component';

const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: 'hero', component: HeroComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'expense', component: ExpenseComponent },
      { path: 'investing', component: InvestingComponent },
      { path: 'saveings', component: SaveingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
