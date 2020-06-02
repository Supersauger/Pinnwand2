import { Component, OnInit } from '@angular/core';
import {Group} from '../group';
import {GroupService} from '../group.service';
import {Pin} from '../pin';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService) { }
  Gruppen: Group[];
  GruppenNamen: string[];
  ngOnInit(): void {
    this.getGroups();
    this.getAllGroups();
    //this.makeAutocomplete();
  }
  getGroups(): void {
    this.groupService.getGroups(localStorage.getItem('UserId')).then((response: any) => {
      console.log('Response', response);
      this.Gruppen = response;
    });
  }
  getAllGroups(): void {
    this.groupService.getAllGroups().then((response: any) => {
      console.log('Response', response);
      var gruppen = response;
      this.GruppenNamen = [];
      for (var gruppe in gruppen){
        console.log(gruppe);
        this.GruppenNamen.push(gruppen[gruppe].name);
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
  }/*
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