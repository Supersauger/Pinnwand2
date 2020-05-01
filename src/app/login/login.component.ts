import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoginService} from '../login.service';
import {User} from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) {}

  Users: User[];
  LoggingUser : User;
  dummerstring = 'data';
  username: string;
  password: string;
  showSpinner: boolean;
  UserObservable: Observable<User>;

  ngOnInit(): void {
  }

  login() {
    this.showSpinner = true;
    this.loginService.getUserByName(this.username).then((response: any) => {
      console.log('Response', response);
      if (response.length > 0) {

        if (this.password === response[0].passwort) {
          this.router.navigate(['hauptmenu']);
        } else {
          alert('Invalid credentials');
        }
      } else {alert('Invalid credentials'); }
      this.showSpinner = false;
    });
  }
  find() {
    // this.loginService.getAllUsers().subscribe(results => console.log(this.Users.push(results)));
    this.loginService.getAllUsers().then((response: any) => {
      console.log('Response', response);
      this.Users = response;
    });
    //this.loginService.insertUser({name: 'Hanni', email: 'jo@jo.coim', passwort: 'ajsdnlfjnalsdkjnflasjndlfjknalsdjnflajknsd'});
  }
}
