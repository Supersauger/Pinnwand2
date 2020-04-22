import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {find2} from '../db/db.user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {}

  username: string;
  password: string;
  showSpinner: boolean;

  ngOnInit(): void {
  }

  login() {
    this.showSpinner = true;
    if ( this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['hauptmenu']);
    } else {
      alert('Invalid credentials');
    }
  }
  find(str) {
    find2(str);
  }
}
