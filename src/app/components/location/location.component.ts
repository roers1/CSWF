import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  switchMap,
} from 'rxjs/operators';
import { Location } from '../../models/location';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations$: Observable<Location[]>;

  private searchTerms = new Subject<string>();

  constructor(
    public authService: AuthService,
    private locationService: LocationService,
    private _snackBar: MatSnackBar
  ) {
    this.locations$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.locationService.searchLocations(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  deleteLocation(location: Location): void {
    this.locationService
      .delete(location, this.authService.user._id)
      .subscribe();
    this._snackBar.open(location.name + ' removed!', 'Ok', {
      duration: 2000,
    });
    this.search('');
  }

  ngAfterViewInit(): void {
    this.searchTerms.next(' ');
  }
  ngOnInit(): void {}
}