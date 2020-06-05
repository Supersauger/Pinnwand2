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
  prefix = ''; // http://localhost:8080
  constructor(private http: HttpClient) {
  }

  /*async getAllUsers2() {
    const result =  this.http.get('/api/users');
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }
  getAllUsersBackup(): Observable<User> {
    return this.http.get<User>('/api/users');
  }
  getUserByName(name: string): Observable<User> {
    return this.http.get<User>('/api/users' + name);
  }
  getUserByBID(bid: number): Observable<User> {
    return this.http.get<User>('/api/users' + bid);
  }
  insertUser(user: User) {
    const result =  this.http.post('/api/users', user);
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }*/
  insertUser(user: User): Promise<void | User> {
    return this.http.post(this.prefix + '/api/users', user)
               .toPromise()
               .then(response => response as User)
               .catch(this.handleError);
  }

  getAllUsers(): Promise<void | User[]> {
    return this.http.get(this.prefix + '/api/users') // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }

  getUserByName(name: string): Promise<void | User[]> {
    return this.http.get(this.prefix + '/api/users' + name) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }
  getUserByAttribute(elem: string, value: string): Promise<void | User[]> {
    return this.http.get(this.prefix + '/api/users/' + elem + value ) // Für Heroku die Localhost entfernen, Heroku: '/api/users' + name, // local: 'http://localhost:8080/api/users' + name
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
