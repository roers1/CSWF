﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {}
}