import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/AuthGuards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/lists/appointments/appointments.component';
import { EmployeeListComponent } from './components/lists/employee-list/employee-list.component';
import { HaircutlistComponent } from './components/lists/haircutlist/haircutlist.component';
import { LocationComponent } from './components/lists/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { LocationMenuComponent } from './components/menus/location-menu/location-menu.component';
import { BeschrijvingComponent } from './components/misc/beschrijving/beschrijving.component';
import { LocationDetailsComponent } from './components/overviews/location-details/location-details.component';
import { MyAccountComponent } from './components/overviews/my-account/my-account.component';
import { RegisterLocationComponent } from './components/registers/register-location/register-location.component';
import { RegisterComponent } from './components/registers/register/register.component';

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
      { path: 'haircuts', component: HaircutlistComponent },
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
