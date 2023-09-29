import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { DashboardComponent } from './dashboard.component';
import { ExpenseFormComponent } from './expense/expense-form/expense-form.component';
import { ExpenseComponent } from './expense/expense.component';
import { InvestingFormComponent } from './investing/investing-form/investing-form.component';
import { InvestingComponent } from './investing/investing.component';
import { SaveingsFormComponent } from './saveings/saveings-form/saveings-form.component';
import { SaveingsComponent } from './saveings/saveings.component';

import {
  DxChartModule,
  DxSelectBoxModule,
  DxPieChartModule,
  DxDataGridModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxListModule,
  DxTemplateModule,
  DxPopupModule,
  DxPopoverModule,
  DxSparklineModule,
  DxFormModule,
  DxToastModule,
  DxButtonModule,
} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import { WildcardComponentComponent } from '../wildcard-component/wildcard-component.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';

@NgModule({
  declarations: [
    DashboardComponent,
    InvestingComponent,
    ExpenseComponent,
    SaveingsComponent,
    InvestingFormComponent,
    SaveingsFormComponent,
    ExpenseFormComponent,
    BankAccountComponent,
    NavigationComponent,
    WildcardComponentComponent,
  ],

  imports: [
    RouterModule,
    DashboardRoutingModule,
    CommonModule,
    FormsModule,

    // Devextreme
    DxToastModule,
    DxButtonModule,
    DxFormModule,
    DxChartModule,
    DxSelectBoxModule,
    DxPieChartModule,
    DxDataGridModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDropDownBoxModule,
    DxListModule,
    DxTemplateModule,
    DxPopupModule,
    DxPopoverModule,
    DxSparklineModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class DashboardModule {}
