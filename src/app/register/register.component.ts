import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  state = {
    emailto: 'balolp86@gmail.com',
    from_name: 'Test',
    to_name: 'Orhan',
    password: '',
    username: ''
  };

  username: string;
  password: string;
  showSpinner: boolean;
  email: string;
  event: Event;

  ngOnInit(): void {
  }
// todo
  register() {
    if (this.username === 'admin' && this.password === 'admin' && this.email === 'admin@admin.de') {
      this.sendEmail();
      alert('Danke für deine Registrierung. Bitte überprüf dein E-Mail Postfach nach einem Verfizierungslink.');
    } else {
      alert('Es existiert ein Account schon mit der E-Mail Adresse ' + this.email);
    }
  }

  public sendEmail() {
    // e.preventDefault();
    emailjs.send('default_service', 'template_kZimYnEg', this.state,  'user_QtkAR9EE8AeCy1zTKNCyO')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}


