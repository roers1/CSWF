import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
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
import { MyAccountComponent } from './my-account/my-account.component';
import { MatMenuModule } from '@angular/material/menu';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { BeschrijvingComponent } from './beschrijving/beschrijving.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LocationMenuComponent } from './location-menu/location-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeListDialogComponent } from './employee-list-dialog/employee-list-dialog.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { TimeslotDialogComponent } from './timeslot-dialog/timeslot-dialog.component';

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
