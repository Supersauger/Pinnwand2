import {Component, OnInit, Input, HostListener, ElementRef, Output, EventEmitter} from '@angular/core';
import {Pin} from '../pin';

@Component({
  selector: 'app-big-pin',
  templateUrl: './big-pin.component.html',
  styleUrls: ['./big-pin.component.css']
})
export class BigPinComponent implements OnInit {

  @Input() pin: Pin;
  @Output() pinChange = new EventEmitter();
  pinChanged() {
    this.pinChange.emit(null);
  }
  @HostListener('document:click')
  clickout(event) {
    //this.pin = null;
  /*  console.log(this.pin)
    this.pinChanged();*/
  }
  constructor() { }
  ngOnInit(): void {
  }

}
