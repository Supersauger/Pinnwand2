import { Injectable } from '@angular/core';
import { Pin} from './pin';
import { PINS } from './mock-pins';
import {moveItemInArray} from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  localPINS = PINS;
  getPins(): Pin[] {
    return this.localPINS;
  }
  dragDropReorder(event): void {
    moveItemInArray(this.localPINS, event.previousIndex, event.currentIndex);
  }
  constructor() { }
}
