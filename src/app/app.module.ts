import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from '../app/app-routing.module';

import { AlertComponent } from '../_directives';
import { AuthGuard } from '../_guards';
import { ErrorInterceptor } from '../_helpers';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { HomeComponent } from '../home';
import { LoginComponent } from '../login';
import { RegisterComponent } from '../register';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from '../account/account.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, routing],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    MenuComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
