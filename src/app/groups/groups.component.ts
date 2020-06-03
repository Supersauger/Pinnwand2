import { Component, OnInit } from '@angular/core';
import {Group} from '../group';
import {GroupService} from '../group.service';
import {Pin} from '../pin';
import {CompleterItem} from 'ng2-completer';
import {LoginService} from '../login.service';
import {User} from '../user';
import emailjs, {EmailJSResponseStatus} from 'emailjs-com';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService, private loginService: LoginService) { }
  groupsOfTheUser: Group[];
  groupNamesForAutocomplete: string[];
  searchedGroupForJoining: Group;
  searchedUserForInvite: User;
  currentlySelectedGroup: Group;
  allPublicGroups: Group[];
  allUsers: User[];
  userNamesForAutocomplete: string[];
  emailInfo = {
    emailto: '',
    adminname: '',
    username: '',
    groupname: ''
  };
  ngOnInit(): void {
    this.getGroupsOfUser();
    this.getAllUsers();
    this.getAllPublicGroups();
  }
  getAllUsers(): void {
    this.loginService.getAllUsers().then((response: any) => {
      console.log('getAllUsers Response', response);
      this.allUsers = response;
      this.userNamesForAutocomplete = [];
      for (const i in response) {
        this.userNamesForAutocomplete.push(response[i].name);
      }
    });
  }
  getGroupsOfUser(): void {
    this.groupService.getGroups(localStorage.getItem('UserId')).then((response: any) => {
      console.log('getGroupsOfUser Response', response);
      this.groupsOfTheUser = response;
    });
  }
  getAllPublicGroups(): void {
    this.groupService.getAllGroups().then((response: any) => {
      this.allPublicGroups = [];
      this.groupNamesForAutocomplete = [];
      for (const gruppe in response) {
        if (!response[gruppe].privat) {
          this.allPublicGroups.push(response[gruppe]);
          this.groupNamesForAutocomplete.push(response[gruppe].name);
        }
      }
      console.log('getAllPublicGroups', this.allPublicGroups);
    });
  }
  postGroup(): void {
    const name = (document.getElementById('GruppenEditorName') as HTMLInputElement).value;
    const privat = (document.getElementById('GruppenEditorName') as HTMLInputElement).checked;
    const group: Group = {name, nutzer_ids: [localStorage.getItem('UserId')], admin_id: localStorage.getItem('UserId'), _id: '', privat};
    this.groupService.addGroup(group).then((response: any) => {
      console.log('postGroup Response', response);
      this.getGroupsOfUser();
      this.getAllPublicGroups();
    });
  }
  chooseGroupScreen(id: string, gruppe: Group): void {
    localStorage.setItem('GruppenId', gruppe._id);
    localStorage.setItem('GruppenName', gruppe.name);
    localStorage.setItem('GruppenAdmin', gruppe.admin_id);
    this.currentlySelectedGroup = gruppe;

  }
  chooseOwnScreen(): void {
    localStorage.removeItem('GruppenId');
    localStorage.removeItem('GruppenName');
    localStorage.removeItem('GruppenAdmin');
    this.currentlySelectedGroup = null;
  }
  joinPublicGroup(): void {
    const group = this.searchedGroupForJoining;
    group.nutzer_ids.push(localStorage.getItem('UserId'));
    this.groupService.updateGroup(group).then((response: any) => {
      console.log('joinPublicGroup Response', response);
      this.getGroupsOfUser();
    });
  }
  selectedAGroup(selected: CompleterItem): void {
    if (selected) {
      for (const dam in this.allPublicGroups) {
        if (this.allPublicGroups[dam].name == selected.originalObject) {
          this.searchedGroupForJoining = this.allPublicGroups[dam];
        }
      }
    }
  }
  selectedAUser(selected: CompleterItem): void {
    if (selected) {
      for (const dam in this.allUsers) {
        if (this.allUsers[dam].name == selected.originalObject) {
          this.searchedUserForInvite = this.allUsers[dam];

        }
      }
    }
  }
  inviteUser(): void {
    if (this.searchedUserForInvite && this.checkifUserIsNotInGroup(localStorage.getItem('UserId'))) {

      const group = this.currentlySelectedGroup;
      group.nutzer_ids.push(this.searchedUserForInvite._id);
      this.groupService.updateGroup(group).then((response: any) => {
        console.log('inviteUser Response', response);
        this.getGroupsOfUser();
        this.getAllPublicGroups();
      });
      this.sendMail();
      alert('Einladung wurde abgeschickt!');
    }
  }

  sendMail(): void {
        this.emailInfo.emailto = this.searchedUserForInvite.email;
        this.emailInfo.username = this.searchedUserForInvite.name;
        this.emailInfo.adminname = localStorage.getItem('UserName');
        this.emailInfo.groupname = this.currentlySelectedGroup.name;
        emailjs.send('default_service', 'einladungsmail', this.emailInfo, 'user_QtkAR9EE8AeCy1zTKNCyO')
          .then((result: EmailJSResponseStatus) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
    }

  checkifUserIsNotInGroup(user): boolean {
    return user in this.currentlySelectedGroup.nutzer_ids;
  }
}
