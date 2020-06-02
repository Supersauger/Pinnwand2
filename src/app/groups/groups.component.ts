import { Component, OnInit } from '@angular/core';
import {Group} from '../group';
import {GroupService} from '../group.service';
import {Pin} from '../pin';
import {CompleterItem} from 'ng2-completer';
import {LoginService} from '../login.service';
import {User} from '../user';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService, private loginService: LoginService) { }
  userGroups: Group[];
  GruppenNamen: string[];
  selectedGroup: Group;
  selectedUserObject: User;
  allGroups: Group[];
  allUsers: User[];
  allUserNamen: string[];
  privat: false;
  ngOnInit(): void {
    this.getGroups();
    this.getAllUsers();
    this.getAllGroups();
  }
  getAllUsers(): void {
    this.loginService.getAllUsers().then((response: any) => {
      console.log('Response', response);
      this.allUsers = response;
      this.allUserNamen = [];
      for (var i in response){
        this.allUserNamen.push(response[i].name);
      }
    });
  }
  getGroups(): void {
    this.groupService.getGroups(localStorage.getItem('UserId')).then((response: any) => {
      console.log('Response', response);
      this.userGroups = response;
    });
  }
  getAllGroups(): void {
    this.groupService.getAllPublicGroups().then((response: any) => {
      console.log('Response', response);
      this.allGroups = [];
      this.GruppenNamen = [];
      for (var gruppe in response){
        if (!response[gruppe].privat){
          this.allGroups.push(response[gruppe]);
          this.GruppenNamen.push(response[gruppe].name);
        }
      }
    });
  }
  addGroup(): void {
    const title = (document.getElementById('GruppenEditorName') as HTMLInputElement).value;
    const group: Group = {name: title, nutzer_ids: [localStorage.getItem('UserId')], admin_id: localStorage.getItem('UserId'), _id: '', privat: this.privat};
    this.groupService.addGroup(group).then((response: any) => {
      console.log('Response', response);
      this.getGroups();
      this.getAllGroups();
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
  selectedUser(selected: CompleterItem): void {
    if (selected) {
      for (var dam in this.allUsers){

        if (this.allUsers[dam].name == selected.originalObject){
          this.selectedUserObject = this.allUsers[dam];

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
