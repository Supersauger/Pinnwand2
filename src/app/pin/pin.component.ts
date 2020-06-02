import {Component, HostListener, OnInit} from '@angular/core';
import {DragDropModule, CdkDragDrop, CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
import { Pin } from '../pin';
import {PinService} from '../pin.service';
import {GroupService} from '../group.service';
import { Group} from '../group';
import {Login} from '../interfaces/login';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  Pins: Pin[];
  Gruppen: Group[];
  bigPin: Pin;
  constructor(private pinService: PinService) { }
  ngOnInit(): void {
    this.getPins();
  }
  getPins(): void {
    if (localStorage.getItem('GruppenId')) {
      console.log('suche Pins von Gruppe mit id ' + localStorage.getItem('UserId'));
      this.pinService.getPinsByGroup(localStorage.getItem('GruppenId')).then((response: any) => {
        console.log('Response', response);
        this.Pins = response;
      });
    } else {
      console.log('suche Pins von user mit id ' + localStorage.getItem('UserId'));
      this.pinService.getPinsByUser(localStorage.getItem('UserId')).then((response: any) => {
        console.log('Response', response);
        this.Pins = response;
      });
    }
  }
  postPin(): void {
    const title = (document.getElementById('PinEditorTitel') as HTMLInputElement).value;
    const body = (document.getElementById('PinEditorInhalt') as HTMLInputElement).value;

    if (localStorage.getItem('GruppenId')) {
      var editPin: Pin = {titel: title, inhalt: body, datum: + new Date(), autor_id: localStorage.getItem('UserId'), autor_name: localStorage.getItem('UserName'), gruppen_id: localStorage.getItem('GruppenId'), _id: ''};
    } else {
      var editPin: Pin = {titel: title, inhalt: body, datum: + new Date(), autor_id: localStorage.getItem('UserId'), autor_name: localStorage.getItem('UserName'), gruppen_id: '', _id: ''};
    }
    this.pinService.postPin(editPin).then((response: any) => {
      console.log('Response', response);
      this.getPins();
    });
  }
  deletePin(id: string, autorid: string): void {
    if (localStorage.getItem('UserId') === autorid) {
      this.pinService.deletePin(id).then((response: any) => {
        console.log('Response', response);
        this.getPins();
      });
    } else {
      console.log('Jo des wird nix, ist net dein Pin');
    }
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
