import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/AuthGuards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { RegisterLocationComponent } from './register-location/register-location.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { BeschrijvingComponent } from './beschrijving/beschrijving.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LocationMenuComponent } from './location-menu/location-menu.component';
import { Location } from '../models/location';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: MyAccountComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'registerLocation', component: RegisterLocationComponent },
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
