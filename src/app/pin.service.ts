import { Injectable } from '@angular/core';
import { Pin} from './pin';
import { PINS } from './mock-pins';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {User} from './user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  localPINS = PINS;

  constructor(private http: HttpClient) { }
  getPins(): Pin[] {
    return this.localPINS;
  }
  dragDropReorder(event): void {
    moveItemInArray(this.localPINS, event.previousIndex, event.currentIndex);
  }
  getPinsByUser(id: string): Promise<void | User[]> {
    return this.http.get('http://localhost:8080/api/pins/user' + id) // Für Heroku die Localhost entfernen
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
