import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoginService} from '../login.service';
import {User} from '../user';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private loginService: LoginService) {}

  model: Login = { userid: 'admin', password: 'admin' };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  showSpinner: boolean;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/hauptmenu';
    this.authService.logout();
  }

  get f() { return this.loginForm.controls; }

  login() {

// stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      console.log(this.f.userid.value);
      this.loginService.getUserByName(this.f.userid.value).then((response: any) => {
        console.log('Response', response);
        if (response.length > 0) {
          if (this.f.password.value === response[0].passwort) {
            console.log('Login successful');
            // this.authService.authLogin(this.model);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', this.f.userid.value);
            localStorage.setItem('UserId', response[0]._id);
            localStorage.setItem('UserName', response[0].name);
            this.router.navigate([this.returnUrl]);
          } else {
            this.message = 'Please check your userid and password';
          }
        } else {this.message = 'Please check your userid and password';
        }
      });
    }
  }
}
