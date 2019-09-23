import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class UserDetailResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id'])
      .pipe(take(1), catchError(e => {
        this.alertify.error('Sorry, something went wrong, try again in a few seconds.');
        this.router.navigate(['/matches']);
        return of(null);
      }));
  }
}
