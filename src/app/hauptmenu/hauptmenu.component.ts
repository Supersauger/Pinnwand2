import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-hauptmenu',
  templateUrl: './hauptmenu.component.html',
  styleUrls: ['./hauptmenu.component.css']
})
export class HauptmenuComponent implements OnInit {
  id: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    // console.log(this.id);
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
