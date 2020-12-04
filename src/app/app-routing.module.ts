import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/AuthGuards/auth.guard';
import { BeschrijvingComponent } from './components/beschrijving/beschrijving.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { LocationMenuComponent } from './components/location-menu/location-menu.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegisterLocationComponent } from './components/register-location/register-location.component';
import { RegisterComponent } from './components/register/register.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: MyAccountComponent, canActivate: [AuthGuard] },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'locations', component: LocationComponent, canActivate: [AuthGuard] },
  {
    path: 'registerLocation',
    component: RegisterLocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'location/:id',
    component: LocationMenuComponent,
    children: [
      {
        path: 'details',
        component: LocationDetailsComponent,
      },
      { path: 'employee', component: EmployeeListComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'beschrijving', component: BeschrijvingComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
