import { Injectable } from '@angular/core';
import { Pin} from './pin';
import { PINS } from './mock-pins';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  getPins(): Pin[] {
    return PINS;
  }
  constructor() { }
}
