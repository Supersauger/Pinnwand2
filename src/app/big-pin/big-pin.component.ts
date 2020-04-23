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

  closeBigPin(event) {
    this.pinChange.emit(null);
  }
  constructor() { }
  ngOnInit(): void {
  }

}
