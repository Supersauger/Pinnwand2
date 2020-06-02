import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Pin} from './pin';
import {Group} from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  prefix = 'http://localhost:8080';
  getGroups(id: string): Promise<void | User[]> {
    return this.http.get(this.prefix + '/api/groups/user' + id) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }
  getAllPublicGroups(): Promise<void | User[]> {
    return this.http.get(this.prefix + '/api/groups') // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }
  addGroup(group: Group): Promise<void | Pin[]> {
    return this.http.post(this.prefix + '/api/groups', group) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  updateGroup(group: Group): Promise<void | Pin[]> {
    return this.http.put(this.prefix + '/api/groups' + group._id, group) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
