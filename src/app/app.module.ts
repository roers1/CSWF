import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateAppointmentDialogComponent } from './components/dialogs/create-appointment-dialog/create-appointment-dialog.component';
import { EmployeeListDialogComponent } from './components/dialogs/employee-list-dialog/employee-list-dialog.component';
import { HaircutDialogComponent } from './components/dialogs/haircut-dialog/haircut-dialog.component';
import { TimeslotDialogComponent } from './components/dialogs/timeslot-dialog/timeslot-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/lists/appointments/appointments.component';
import { EmployeeListComponent } from './components/lists/employee-list/employee-list.component';
import { HaircutlistComponent } from './components/lists/haircutlist/haircutlist.component';
import { LocationComponent } from './components/lists/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { LocationMenuComponent } from './components/menus/location-menu/location-menu.component';
import { MenuComponent } from './components/menus/menu/menu.component';
import { BeschrijvingComponent } from './components/misc/beschrijving/beschrijving.component';
import { LocationDetailsComponent } from './components/overviews/location-details/location-details.component';
import { MyAccountComponent } from './components/overviews/my-account/my-account.component';
import { RegisterLocationComponent } from './components/registers/register-location/register-location.component';
import { RegisterComponent } from './components/registers/register/register.component';
import { AlertComponent } from './components/misc/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
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
    TimeslotDialogComponent,
    AppointmentsComponent,
    CreateAppointmentDialogComponent,
    HaircutDialogComponent,
    HaircutlistComponent,
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
