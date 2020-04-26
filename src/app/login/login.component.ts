import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
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
  username: string;
  password: string;
  showSpinner: boolean;


  ngOnInit(): void {
    this.getUsers();
  }

  login() {
    this.showSpinner = true;
    if ( this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['hauptmenu']);
    } else {
      alert('Invalid credentials');
    }
  }
  getUsers(): void {
    this.Users = this.loginService.getUsers();
    // this.Pins = PINS;
  }
  find() {
    console.log(this.Users);

    console.log(this.http.get('http://localhost/hallo.php').pipe(
      map((res) => {
        this.Users = res[this.username];
        return this.Users;
      })));
  }
  find2() {
    console.log('find');
    // console.log(this.http.get('http://localhost/hallo.php'));
  }
}
