import { Injectable } from '@angular/core';
import {User} from './user';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  async getAllUsers() {
    const result =  this.http.get('/api/users');
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }
  getAllUsersBackup(): Observable<User> {
    return this.http.get<User>('api/users');
  }
  getUserByName(name: string): Observable<User> {
    return this.http.get<User>('/api/users' + name);
  }
  getUserByBID(bid: number): Observable<User> {
    return this.http.get<User>('/api/users' + bid);
  }
  insertUser2(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
  insertUser(user: User) {
    const result =  this.http.post('/api/users', user);
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }
  deleteUserByName(name: string): Observable<User> {
    return this.http.delete<User>('/api/users' + name);
  }
  updateUser(): Observable<User> {
    console.log('Currently not supported');
    return this.http.get<User>('/api/users');
  }
}
