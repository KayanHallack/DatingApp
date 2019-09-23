import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
