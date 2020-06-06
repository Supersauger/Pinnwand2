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
      this.pinService.getPinsByGroup(localStorage.getItem('GruppenId')).then((response: any) => {
        this.Pins = response;
      });
    } else {
      this.pinService.getPinsByUser(localStorage.getItem('UserId')).then((response: any) => {
        this.Pins = response;
      });
    }
  }
  postPin(): void {
    const title = (document.getElementById('PinEditorTitel') as HTMLInputElement);
    const body = (document.getElementById('PinEditorInhalt') as HTMLInputElement);
    let editPin: Pin;
    if (localStorage.getItem('GruppenId')) {
      editPin = {titel: title.value, inhalt: body.value, datum: + new Date(),
        autor_id: localStorage.getItem('UserId'), autor_name: localStorage.getItem('UserName'),
        gruppen_id: localStorage.getItem('GruppenId'), _id: ''};
    } else {
      editPin = {titel: title.value, inhalt: body.value, datum: + new Date(), autor_id: localStorage.getItem('UserId'),
        autor_name: localStorage.getItem('UserName'), gruppen_id: '', _id: ''};
    }
    this.pinService.postPin(editPin).then((response: any) => {
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
    } else {
      if (localStorage.getItem('GruppenAdmin') === localStorage.getItem('UserId')) {
        this.pinService.deletePin(id).then((response: any) => {
          this.getPins();
        });
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

    if (localStorage.getItem('UserId') === this.chosenPin.autor_id) {
      const element = document.createElement('button');
      element.setAttribute('class', 'btn btn-secondary');
      element.addEventListener('click', (e: Event) => this.commitContent());
      element.innerHTML = 'Save';
      document.getElementById('pinInhalt').innerHTML = '<textarea class="w-100 bg-light" style="height: 50vh; resize: None" id = "newContent"> '
        + this.chosenPin.inhalt + ' </textarea> ';
      document.getElementById('pinInhalt').append(element);
    }
  }

  changeContentBack(): void {
    // document.getElementById('pinInhalt').innerHTML = '<div class="modal-body" id = "pinInhalt" [innerText]="chosenPin.inhalt"></div>';
    document.getElementById('pinInhalt').innerText = this.chosenPin.inhalt;

  }

  commitContent(): void {
    this.chosenPin.inhalt = (document.getElementById('newContent') as HTMLInputElement).value;
    this.changeContentBack();
    this.pinService.editPin(this.chosenPin).then((response: any) => {
      this.getPins();
    });
  }
  savePin(pin: Pin): void {
    pin.autor_id = localStorage.getItem('UserId');
    pin.gruppen_id = null;
    this.pinService.postPin(pin).then((response: any) => {
      this.getPins();
    });
  }
}
