import {Component, HostListener, OnInit} from '@angular/core';
import { Pin } from '../pin';
import {PINS} from '../mock-pins';
import {PinService} from '../pin.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  Pins: Pin[];
  bigPin: Pin;
 /* @HostListener('document:click')
  clickout(event) {
    if (this.bigPin) {
      console.log(this.bigPin);
      this.bigPin = null;
      console.log(this.bigPin);
    }
  }*/
  constructor(private heroService: PinService) { }
  ngOnInit(): void {
    this.getPins();
  }
  getPins(): void {
    this.Pins = this.heroService.getPins();
  }
  onClickMe(clickedPin): void {
    console.log(clickedPin)
    this.bigPin = clickedPin;
  }
  pinChange(apin): void {
    this.bigPin = apin;
  }
}
