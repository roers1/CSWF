import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ErrorStateMatcher,
  MatNativeDateModule,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { AdminComponent } from './components/admin/admin.component';
import { BeschrijvingComponent } from './components/beschrijving/beschrijving.component';
import { EmployeeListDialogComponent } from './components/employee-list-dialog/employee-list-dialog.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { LocationMenuComponent } from './components/location-menu/location-menu.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegisterLocationComponent } from './components/register-location/register-location.component';
import { RegisterComponent } from './components/register/register.component';
import { TimeslotDialogComponent } from './components/timeslot-dialog/timeslot-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LocationComponent,
    LoginComponent,
    MenuComponent,
    RegisterComponent,
    RegisterLocationComponent,
    AlertComponent,
    MyAccountComponent,
    LocationDetailsComponent,
    BeschrijvingComponent,
    EmployeeListComponent,
    LocationMenuComponent,
    EmployeeListDialogComponent,
    AccountMenuComponent,
    TimeslotDialogComponent,
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
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    NgbModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMenuModule,
  ],
  providers: [AuthGuard, AlertService, AuthService, UserService],

  bootstrap: [AppComponent],
})
export class AppModule {}
