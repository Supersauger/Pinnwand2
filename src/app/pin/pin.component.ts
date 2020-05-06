import {Component, HostListener, OnInit} from '@angular/core';
import {DragDropModule, CdkDragDrop, CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
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
  constructor(private pinService: PinService) { }
  ngOnInit(): void {
    this.getPins();
  }
  getPins(): void {
    console.log('suche Pins von user mit id ' + localStorage.getItem('UserId'));
    this.pinService.getPinsByUser(localStorage.getItem('UserId')).then((response: any) => {
      console.log('Response', response);
      if (response.length > 0) {
        this.Pins = response;
        }
    });
  }
  onClickMe(clickedPin): void {
    console.log(clickedPin);
    this.bigPin = clickedPin;
  }
  pinChange(apin): void {
    this.bigPin = apin;
  }
  drop(event: CdkDragDrop<string[]>) {
    this.pinService.dragDropReorder(event);
  }
  entered(event: CdkDragEnter) {
    moveItemInArray(this.Pins, event.item.data, event.container.data);
  }
}
