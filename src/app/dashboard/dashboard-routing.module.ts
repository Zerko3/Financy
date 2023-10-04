import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/auth/auth.guard';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { DashboardComponent } from './dashboard.component';
import { WildcardComponentComponent } from '../wildcard-component/wildcard-component.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'createCard',
        component: BankAccountComponent,
      },
    ],
  },

  { path: '**', component: WildcardComponentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
