import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../login.service';
import {User} from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }
  state = {
    emailto: '',
    password: '',
    username: ''
  };

  user = {
    name: '',
    passwort: '',
    email: '',
    gruppen : []
  };


  registerForm: FormGroup;
  message: string;


  username: string;
  password: string;
  showSpinner: boolean;
  email: string;
  event: Event;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: ['', Validators.required]
    });
  }
// todo

  get f() { return this.registerForm.controls; }

  register() {
    alert('Email Checken');
  }

 checkRegisterInput() {
// stop here if form is invalid
    if (this.registerForm.invalid) {
      alert('Ungültige Eingabe');
      return;
    } else {
      this.loginService.getUserByAttribute('email', this.f.email.value).then((response: any) => {
        console.log('Response', response);
        if (response.length > 0) {
          alert('Email schon verwendet.');
        } else {
          this.loginService.getUserByAttribute('name', this.f.name.value).then((responseTwo: any) => {
            console.log('Response2', responseTwo);
            if (responseTwo.length > 0) {
              alert('Der Benutzername wird schon verwendet.');
            } else {
              this.user.name = this.f.name.value;
              this.user.passwort = this.f.password.value;
              this.user.email = this.f.email.value;
              this.user.gruppen = [];
              this.loginService.insertUser(this.user).then((newUser: User) => {});
              this.sendEmail();
            }
          });
        }
      });
      console.log(this.message);
    }
  }



  public sendEmail() {
    // e.preventDefault();
    this.state.emailto = this.f.email.value;
    this.state.username = this.f.name.value;
    this.state.password = this.f.password.value;
    emailjs.send('default_service', 'template_kZimYnEg', this.state,  'user_QtkAR9EE8AeCy1zTKNCyO')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}


