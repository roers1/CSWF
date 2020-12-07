import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';

import { Location } from '../../../models/location';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.css'],
})
export class LocationMenuComponent implements OnInit {
  loading = false;
  submitted = false;
  updatedLocation: Location;
  id: string;

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLocation();
  }

  getLocation(): void {
    this.locationService
      .getLocation(this.id)
      .subscribe((data: any) => (this.locationService.location = data));
  }
}
