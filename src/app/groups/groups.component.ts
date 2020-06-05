import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  @Output() update = new EventEmitter();
  @Output() logOut = new EventEmitter();

  constructor(private groupService: GroupService, private loginService: LoginService) { }
  groupsOfTheUser: Group[];
  groupNamesForAutocomplete: string[];
  searchedGroupForJoining: Group;
  searchedUserForInvite: User;
  currentlySelectedGroup: Group;
  usersInCurrentlySelectedGroup: string[];
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
      this.allUsers = response;
      this.userNamesForAutocomplete = [];
      for (const i in response) {
        this.userNamesForAutocomplete.push(response[i].name);
      }
    });
  }
  getGroupsOfUser(): void {
    this.groupService.getGroups(localStorage.getItem('UserId')).then((response: any) => {
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
    });
  }
  postGroup(): void {
    const name = (document.getElementById('GruppenEditorName') as HTMLInputElement).value;
    const privat = (document.getElementById('checkPrivate') as HTMLInputElement).checked;
    console.log(privat);
    const group: Group = {name, nutzer_ids: [localStorage.getItem('UserId')], admin_id: localStorage.getItem('UserId'), _id: '', privat};
    this.groupService.addGroup(group).then((response: any) => {
      alert('Gruppe wurde erfolgreich erstellt');
      this.getGroupsOfUser();
      this.getAllPublicGroups();
    });
  }
  chooseGroupScreen(id: string, gruppe: Group): void {
    localStorage.setItem('GruppenId', gruppe._id);
    localStorage.setItem('GruppenName', gruppe.name);
    localStorage.setItem('GruppenAdmin', gruppe.admin_id);
    this.currentlySelectedGroup = gruppe;
    this.usersInCurrentlySelectedGroup = [];
    for (var i in this.currentlySelectedGroup.nutzer_ids) {
      const id = this.currentlySelectedGroup.nutzer_ids[i];
      const found = this.allUsers.find(element => element._id === id);
      if (found) {
        this.usersInCurrentlySelectedGroup.push(found.name);
      }
    }
    this.update.emit();

  }
  chooseOwnScreen(): void {
    localStorage.removeItem('GruppenId');
    localStorage.removeItem('GruppenName');
    localStorage.removeItem('GruppenAdmin');
    this.currentlySelectedGroup = null;
    this.update.emit();
  }
  joinPublicGroup(): void {
    const group = this.searchedGroupForJoining;
    if (!(localStorage.getItem('UserId') in group.nutzer_ids)) {
      group.nutzer_ids.push(localStorage.getItem('UserId'));
      this.groupService.updateGroup(group).then((response: any) => {
        this.getGroupsOfUser();
      });
    }
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
    if ((this.searchedUserForInvite != null) && !this.checkifUserIsNotInGroup(localStorage.getItem('UserId')) && this.currentlySelectedGroup.admin_id === localStorage.getItem('UserId')) {

      const group = this.currentlySelectedGroup;
      group.nutzer_ids.push(this.searchedUserForInvite._id);
      this.groupService.updateGroup(group).then((response: any) => {
        this.getGroupsOfUser();
        this.getAllPublicGroups();
      });
      this.sendMail();
      alert('Einladung wurde abgeschickt!');
    } else {
      alert('User konnte nicht der Gruppe hinzugefügt werden');
    }
  }

  sendMail(): void {
        this.emailInfo.emailto = this.searchedUserForInvite.email;
        this.emailInfo.username = this.searchedUserForInvite.name;
        this.emailInfo.adminname = localStorage.getItem('UserName');
        this.emailInfo.groupname = this.currentlySelectedGroup.name;
        emailjs.send('default_service', 'einladungsmail', this.emailInfo, 'user_QtkAR9EE8AeCy1zTKNCyO')
          .then((result: EmailJSResponseStatus) => {
          }, (error) => {
          });
    }

  checkifUserIsNotInGroup(user): boolean {
    return user in this.currentlySelectedGroup.nutzer_ids;
  }

  leaveGroup(): void {
    if (this.currentlySelectedGroup) {
      let group = this.currentlySelectedGroup;
      const index = group.nutzer_ids.indexOf(localStorage.getItem('UserId'), 0);
      if (index > -1) {
        group.nutzer_ids.splice(index, 1);
        this.groupService.updateGroup(group).then((response: any) => {
          this.getGroupsOfUser();
          this.getAllPublicGroups();
          this.chooseOwnScreen();
        });
      }
    }
  }

  logout(): void {
    this.logOut.emit();
  }

  changePWFct(): void {
    const loggedInUserID = localStorage.getItem('UserId');
    const newPW = (document.getElementById('newPassword') as HTMLInputElement).value;

    if (newPW.length >= 4) {
      for (const userIndex in this.allUsers) {
        if (loggedInUserID === this.allUsers[userIndex]._id) {
          this.allUsers[userIndex].passwort = newPW;
          this.groupService.updateUser(this.allUsers[userIndex]).then((response: any) => {
              alert('Passwort wurde geändert');
            });
        }
      }
    } else {
      alert('Das Passwort muss mindestens vier Zeichen lang sein!');
    }
    this.resetInputData('newPassword');
  }

  resetInputData(inputID): void {
    (document.getElementById(inputID) as HTMLInputElement).value = '';
  }
}
