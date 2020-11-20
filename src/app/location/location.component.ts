import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '../../models/location';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  register: boolean;
  locations: Location[];
  selectedLocation: Location;

  constructor(
    public authService: AuthService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.register = false;
    this.locationService
      .getLocations()
      .subscribe((data) => (this.locations = data));
  }

  editLocation(location: Location): void {
    this.selectedLocation = location;
  }

  deleteLocation(location: Location): void {
    this.locationService.delete(location).subscribe();
  }

  registerLocation() {
    this.register = true;
  }
}
