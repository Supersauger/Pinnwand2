import { Injectable } from '@angular/core';
import { Pin} from './pin';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {User} from './user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  prefix = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  getPins(): Pin[] {
    return null;
  }
  dragDropReorder(event): void {
    //moveItemInArray(this.localPINS, event.previousIndex, event.currentIndex);
  }
  getPinsByUser(id: string): Promise<void | Pin[]> {
    return this.http.get(this.prefix + '/api/pins/user' + id) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  getPinsByGroup(id: string): Promise<void | Pin[]> {
    return this.http.get(this.prefix + '/api/pins/group' + id) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  postPin(pin: Pin): Promise<void | Pin[]> {
    return this.http.post(this.prefix + '/api/pins', pin) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  deletePin(id: string): Promise<void | Pin[]> {
    return this.http.delete(this.prefix + '/api/pins' + id) // Für Heroku die Localhost entfernen
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
