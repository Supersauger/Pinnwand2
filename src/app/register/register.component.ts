import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor() {
  }
  username: string;
  password: string;
  showSpinner: boolean;
  email: string;

  ngOnInit(): void {
  }
// todo
  register() {
    if (this.username === 'admin' && this.password === 'admin' && this.email === 'admin@admin.de') {

      alert('Danke für deine Registrierung. Bitte überprüf dein E-Mail Postfach nach einem Verfizierungslink.');
    } else {
      alert('Es existiert ein Account schon mit der E-Mail Adresse ' + this.email);
    }
  }
}


