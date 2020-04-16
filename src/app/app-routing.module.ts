import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HauptmenuComponent} from './hauptmenu/hauptmenu.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'hauptmenu', component: HauptmenuComponent },
  { path: 'login', component: LoginComponent }
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
