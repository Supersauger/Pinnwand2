import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    emailto: 'balolp86@gmail.com',
    from_name: 'Test',
    to_name: 'Orhan',
    password: '',
    username: ''
  };

  user = {
    name: '',
    passwort: '',
    email: ''
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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
// todo

  get f() { return this.registerForm.controls; }

  register() {
    alert('Email Checken');
  }

 checkRegisterInput() {
    console.log('kek');

// stop here if form is invalid
    if (this.registerForm.invalid) {
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
              console.log('hallo');
              this.user.name = this.f.name.value;
              this.user.passwort = this.f.password.value;
              this.user.email = this.f.email.value;
              this.loginService.insertUser(this.user).then((newUser: User) => {});
              // this.sendEmail();
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
    this.state.to_name = 'Neuer User';
    this.state.from_name = 'Pinnwand Team';
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


