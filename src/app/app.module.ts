import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestingComponent } from './dashboard/investing/investing.component';
import { ExpenseComponent } from './dashboard/expense/expense.component';
import { SaveingsComponent } from './dashboard/saveings/saveings.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WildcardComponentComponent } from './wildcard-component/wildcard-component.component';
// DEVEXTREME
import {
  DxChartModule,
  DxSelectBoxModule,
  DxPieChartModule,
  DxDataGridModule,
  DxButtonModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponentComponent,
    LoginComponentComponent,
    AboutUsComponent,
    RegisterComponentComponent,
    DashboardComponent,
    InvestingComponent,
    ExpenseComponent,
    SaveingsComponent,
    NavigationComponent,
    WildcardComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DxChartModule,
    DxSelectBoxModule,
    DxPieChartModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
