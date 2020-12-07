import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from '../models/user';
import { Location } from '../models/Location';

import { UserService } from './user.service';

describe('UserService', () => {
  //de echte service
  let userService: UserService;

  //mock httpclient
  let httpSpy: any;
  let userServiceSpy: any;

  const expectedUserData: User = {
    _id: '5fc92ca206da013f40642cce',
    firstName: 'Ruben',
    lastName: 'van Oers',
    streetAddress: 'Magnolia 23',
    postalCode: '5682EL',
    city: 'Best',
    dateOfBirth: new Date(1998, 3, 28),
    phoneNumber: 618440009,
    email: 'Rubenvanoers@outlook.com',
    password: 'Abc123!@#',
    employee: true,
    location: undefined,
    timeslot: [],
    appointments: [],
  };

  const expectedUserDataArray = [
    {
      _id: '5fc92ca206da013f40642cce',
      firstName: 'Ruben',
      lastName: 'van Oers',
      streetAddress: 'Magnolia 23',
      postalCode: '5682EL',
      city: 'Best',
      dateOfBirth: new Date(1998, 3, 28),
      phoneNumber: 618440009,
      email: 'Rubenvanoers@outlook.com',
      password: 'Abc123!@#',
      employee: true,
      location: undefined,
      timeslot: [],
      appointments: [],
    },
  ];

  const location: Location = {
    _id: '5fc92ca206da013f40642cce',
    name: 'Best',
    streetAddress: 'Magnolia 23',
    postalCode: '5682EL',
    city: 'Best',
    phoneNumber: 618440009,
    email: 'Rubenvanoers@outlook.com',
    createdOn: new Date(),
    employee: [],
    haircut: [],
  };

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    userServiceSpy = jasmine.createSpyObj('UserSerivce', [
      'getFreeEmployees',
      'register',
      'put',
      'getUsersFromLocation',
      'handleError',
    ]);

    userService = new UserService(httpSpy);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('Should return employee without location', () => {
    httpSpy.get.and.returnValue(of(expectedUserDataArray));

    const subs = userService.getFreeEmployees().subscribe((employees) => {
      expect(employees[0].firstName).toEqual('Ruben');
      expect(employees.length).toBe(1);
    });

    subs.unsubscribe();
  });

  it('Should register employee', () => {
    httpSpy.post.and.returnValue(of(expectedUserData));

    const subs = userService.register(expectedUserData).subscribe((user) => {
      let responseUser = user as User;
      expect(responseUser.firstName).toEqual('Ruben');
    });

    subs.unsubscribe();
  });

  it('Should update employee', () => {
    httpSpy.put.and.returnValue(of(expectedUserData));

    const subs = userService.put(expectedUserData).subscribe((user) => {
      let responseUser = user as User;
      expect(responseUser.firstName).toEqual('Ruben');
    });

    subs.unsubscribe();
  });

  it('Should get user from a specific location', () => {
    httpSpy.get.and.returnValue(of(expectedUserDataArray));

    const subs = userService
      .getUsersFromLocation(location)
      .subscribe((user) => {
        expect(user[0].firstName).toEqual('Ruben');
      });

    subs.unsubscribe();
  });
});
