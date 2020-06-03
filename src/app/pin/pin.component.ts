import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
import {Pin} from '../pin';
import {PinService} from '../pin.service';
import {Group} from '../group';
import { ClickOutsideModule } from 'ng-click-outside';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css'],

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
        console.log(this.chosenPin.inhalt);
      } else {
        this.chosenPin = null;
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


  changeContent(): void {
    let element = document.createElement('button');
    element.addEventListener('click', (e: Event) => this.commitContent());
    element.innerHTML = 'Save';
    document.getElementById('pinInhalt').innerHTML = '<textarea id = "newContent"> ' + this.chosenPin.inhalt + ' </textarea> ';
    document.getElementById('pinInhalt').append(element);
  }

  changeContentBack(): void {
    //document.getElementById('pinInhalt').innerHTML = '<div class="modal-body" id = "pinInhalt" [innerText]="chosenPin.inhalt"></div>';
    console.log("EYOOOOOOOOOOOOOOOOOOOOOOOOO");
    document.getElementById('pinInhalt').innerText = this.chosenPin.inhalt;

  }

  commitContent(): void {
    this.chosenPin.inhalt = (document.getElementById('newContent') as HTMLInputElement).value;
    this.changeContentBack();
    this.pinService.editPin(this.chosenPin).then((response: any) => {
      console.log('Response', response);
      this.getPins();
    });
  }
}
