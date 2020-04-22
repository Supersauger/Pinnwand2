import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private mailService: MessageService) { }

  username: string;
  password: string;
  showSpinner: boolean;
  email: string;

  ngOnInit(): void {
  }
// todo
  register() {
    if (this.username === 'admin' && this.password === 'admin' && this.email === 'admin@admin.de') {
      this.mailService.sendMessage('text');
      alert('Danke für deine Registrierung. Bitte überprüf dein E-Mail Postfach nach einem Verfizierungslink.');
    } else {
      alert('Es existiert ein Account schon mit der E-Mail Adresse ' + this.email);
    }
  }
}
