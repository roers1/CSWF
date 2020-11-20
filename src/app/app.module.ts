import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { RegisterLocationComponent } from './register-location/register-location.component';
import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from 'src/AuthGuards/auth.guard';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AdminComponent,
    EditLocationComponent,
    HomeComponent,
    LocationComponent,
    LoginComponent,
    MenuComponent,
    RegisterComponent,
    RegisterLocationComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [AuthGuard, AlertService, AuthService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
