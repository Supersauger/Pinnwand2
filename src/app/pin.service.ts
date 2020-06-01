import { Injectable } from '@angular/core';
import { Pin} from './pin';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {User} from './user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(private http: HttpClient) { }
  getPins(): Pin[] {
    return null;
  }
  dragDropReorder(event): void {
    //moveItemInArray(this.localPINS, event.previousIndex, event.currentIndex);
  }
  getPinsByUser(id: string): Promise<void | Pin[]> {
    return this.http.get('http://localhost:8080/api/pins/user' + id) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  getPinsByGroup(id: string): Promise<void | Pin[]> {
    return this.http.get('http://localhost:8080/api/pins/group' + id) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  postPin(pin: Pin): Promise<void | Pin[]> {
    return this.http.post('http://localhost:8080/api/pins', pin) // Für Heroku die Localhost entfernen
      .toPromise()
      .then(response => response as Pin[])
      .catch(this.handleError);
  }
  deletePin(id: string): Promise<void | Pin[]> {
    return this.http.delete('http://localhost:8080/api/pins' + id) // Für Heroku die Localhost entfernen
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
