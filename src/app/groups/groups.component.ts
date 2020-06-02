import { Component, OnInit } from '@angular/core';
import {Group} from '../group';
import {GroupService} from '../group.service';
import {Pin} from '../pin';
import {CompleterItem} from 'ng2-completer';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService) { }
  userGroups: Group[];
  GruppenNamen: string[];
  selectedGroup: Group;
  allGroups: Group[];
  ngOnInit(): void {
    this.getGroups();
    this.getAllGroups();
    //this.makeAutocomplete();
  }
  getGroups(): void {
    this.groupService.getGroups(localStorage.getItem('UserId')).then((response: any) => {
      console.log('Response', response);
      this.userGroups = response;
    });
  }
  getAllGroups(): void {
    this.groupService.getAllGroups().then((response: any) => {
      console.log('Response', response);
      this.allGroups = response;
      this.GruppenNamen = [];
      for (var gruppe in this.allGroups){
        console.log(gruppe);
        this.GruppenNamen.push(this.allGroups[gruppe].name);
      }
    });
  }
  addGroup(): void {
    const title = (document.getElementById('GruppenEditorName') as HTMLInputElement).value;
    const group: Group = {name: title, nutzer_ids: [localStorage.getItem('UserId')], admin_id: localStorage.getItem('UserId'), _id: ''};
    this.groupService.addGroup(group).then((response: any) => {
      console.log('Response', response);
      this.getGroups();
    });
  }
  chooseGroup(id: string): void {
    localStorage.setItem('GruppenId', id);
  }
  soloRide(): void {
    localStorage.removeItem('GruppenId');
  }
  read(): void {
    const title = (document.getElementById('dingdong') as HTMLInputElement).value;
    console.log(title);
  }
  requestAccess(): void{

    console.log('request');
    const group = this.selectedGroup;
    group.nutzer_ids.push(localStorage.getItem('UserId'));

    console.log(group);
    this.groupService.updateGroup(group).then((response: any) => {
      console.log('Response', response);
      this.getGroups();
    });
  }

  selected(selected: CompleterItem): void {
    if (selected) {
      for (var dam in this.allGroups){

        if (this.allGroups[dam].name==selected.originalObject){
          this.selectedGroup = this.allGroups[dam];

        }
      }
    }
  }
  /*
  makeAutocomplete(): void {
    let input = document.getElementById('GruppenEditorName');
    input.addEventListener('input', function(e) {
      let a, b, i, val = this.value;
      if (!val) { return false; }
      a = document.createElement('DIV');
      a.setAttribute('id', this.id + 'autocomplete-list');
      a.setAttribute('class', 'autocomplete-items');
      this.parentNode.appendChild(a);
    });
  }*/

}
