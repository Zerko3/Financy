import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { HeroComponentComponent } from './hero-component/hero-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponentComponent } from './register-component/register-component.component';

// DEVEXTREME -> global
import { DxGalleryModule, DxToastModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponentComponent,
    LoginComponentComponent,
    AboutUsComponent,
    RegisterComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // devextreme
    DxToastModule,
    DxGalleryModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
