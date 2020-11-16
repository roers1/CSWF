import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '../home';
import { LoginComponent } from '../login';
import { RegisterComponent } from '../register';
import { AccountComponent } from '../account/account.component';
import { AuthGuard } from '../_guards';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
