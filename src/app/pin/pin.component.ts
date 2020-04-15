import {Component, HostListener, OnInit} from '@angular/core';
import {DragDropModule, CdkDragDrop} from '@angular/cdk/drag-drop';
import { Pin } from '../pin';
import {PinService} from '../pin.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  Pins: Pin[];
  bigPin: Pin;
  constructor(private heroService: PinService) { }
  ngOnInit(): void {
    this.getPins();
  }
  getPins(): void {
    this.Pins = this.heroService.getPins();
  }
  onClickMe(clickedPin): void {
    console.log(clickedPin);
    this.bigPin = clickedPin;
  }
  pinChange(apin): void {
    this.bigPin = apin;
  }
  drop(event: CdkDragDrop<string[]>) {
    this.heroService.dragDropReorder(event);
  }
}
