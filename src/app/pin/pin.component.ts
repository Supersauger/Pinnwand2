import {Component, HostListener, OnInit} from '@angular/core';
import {DragDropModule, CdkDragDrop, CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
import { Pin } from '../pin';
import {PinService} from '../pin.service';
import {Login} from '../interfaces/login';


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
      this.Pins = response;
    });
  }
  postPin(): void {
    var title = document.getElementById('PinEditorTitel').value
    var body = document.getElementById('PinEditorInhalt').value;
    var editPin : Pin = {titel: title, inhalt: body, datum: + new Date(), autor_id: localStorage.getItem('UserId'), autor_name: localStorage.getItem('UserName')};
    this.pinService.postPin(editPin).then((response: any) => {
      console.log('Response', response);
      this.getPins();
    });
  }
  deletePin(id: string): void {
    this.pinService.deletePin(id).then((response: any) => {
      console.log('Response', response);
      this.getPins();
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
