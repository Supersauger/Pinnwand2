import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {}

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

  find(): Observable<any> {
    console.log('find');
    return this.http.get('/db-access.php').pipe(
      catchError(this.handleError(`get`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    console.log('handleError');
    return (error: any): Observable<T> => {

      console.log(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
