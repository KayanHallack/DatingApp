import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.apiUrl}/auth`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router
    ) { }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/login`, model)
      .pipe(take(1), map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);          
        }
      }));
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}/register`, model)
      .pipe(take(1));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.clear();
    this.alertify.message("Logged out");
    this.router.navigate(['/home']);
  }
}
