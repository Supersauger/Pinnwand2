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
  chosenPin: Pin;
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
    const title = (document.getElementById('PinEditorTitel') as HTMLInputElement);
    const body = (document.getElementById('PinEditorInhalt') as HTMLInputElement);
    let editPin: Pin;
    if (localStorage.getItem('GruppenId')) {
      editPin = {titel: title.value, inhalt: body.value, datum: + new Date(), autor_id: localStorage.getItem('UserId'), autor_name: localStorage.getItem('UserName'), gruppen_id: localStorage.getItem('GruppenId'), _id: ''};
    } else {
      editPin = {titel: title.value, inhalt: body.value, datum: + new Date(), autor_id: localStorage.getItem('UserId'), autor_name: localStorage.getItem('UserName'), gruppen_id: '', _id: ''};
    }
    this.pinService.postPin(editPin).then((response: any) => {
      console.log('Response', response);
      this.getPins();
    });

    title.innerText = '';
    body.innerText = '';
  }
  deletePin(id: string, autorid: string): void {
    if (localStorage.getItem('UserId') === autorid) {
      this.pinService.deletePin(id).then((response: any) => {
        console.log('Response', response);
        this.getPins();
      });
      console.log('Deleted own Pin successfully');
    } else {
      if (localStorage.getItem('GruppenAdmin') === localStorage.getItem('UserId')) {
        this.pinService.deletePin(id).then((response: any) => {
          console.log('Response', response);
          this.getPins();
        });
        console.log('Deleted other Pin successfully');
      }
    }
  }
  onClickMe(clickedPin, e): void {
    const ev = (e as Event);
    if (ev.target instanceof Element) {
      if (ev.target.tagName.toLowerCase() !== 'button') {
        console.log(clickedPin);
        this.chosenPin = clickedPin;
      }
    }
  }
  pinChange(apin): void {
    this.chosenPin = apin;
  }
  drop(event: CdkDragDrop<string[]>) {
    this.pinService.dragDropReorder(event);
  }
  entered(event: CdkDragEnter) {
    moveItemInArray(this.Pins, event.item.data, event.container.data);
  }


  changeContent(): void{
    var element = document.createElement("button");
    element.addEventListener("click", (e: Event) => this.saveNewContent());
    element.innerHTML = "Save";
    document.getElementById("pinInhalt").innerHTML = '<textarea id = "newContent"> ' + this.chosenPin.inhalt + ' </textarea> ';
    document.getElementById("pinInhalt").append(element);
  }

  saveNewContent(): void{
    const content =   (document.getElementById("newContent") as HTMLInputElement).value;
    this.chosenPin.inhalt = content;
    document.getElementById("pinInhalt").innerHTML = '<textarea id = "newContent"> ' + this.chosenPin.inhalt + ' </textarea>';
  }
}
