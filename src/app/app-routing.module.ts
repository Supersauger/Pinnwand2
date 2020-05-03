import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HauptmenuComponent} from './hauptmenu/hauptmenu.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'hauptmenu', component: HauptmenuComponent, canActivate : [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
