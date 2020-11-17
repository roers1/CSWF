import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}
}
