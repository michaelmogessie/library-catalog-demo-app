import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'library-catalog-demo-app';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {

  }

  loggedIn: any = localStorage.getItem('user') ? true : false;
  user: any = localStorage.getItem('user')
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
    if (this.loggedIn) {
      this.loggedIn = false
    }
  }

  login() {
    let credentials = { 'email': this.email.value, 'password': this.password.value }
    this.http.post('http://localhost:8885/login', credentials, { observe: 'response' }).subscribe((response: any) => {
      let user = response.body
      user.books = JSON.parse(user.books)
      this.user = user
      localStorage.setItem('auth_token', response.headers.get('Auth_token'))
      localStorage.setItem('user', JSON.stringify(this.user))
      this.loggedIn = true
      this._snackBar.open('Welcome ' + this.user.first_name, 'OK', {
        duration: 3000
      });
    },
      (error) => {
        this._snackBar.open('Invalid email or password', 'OK', {
          duration: 3000
        });
      });

  }

  saveBook(book: any) {
    this.http.post('http://localhost:8885/books/add', book, this.getRequestOptions()).subscribe((response: any) => {
      this._snackBar.open('Success', 'OK', {
        duration: 3000
      });
    },
      (error) => {
        this._snackBar.open('Error, invalid book info.', 'OK', {
          duration: 3000
        });
      });
  }

  getRequestOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
      }),
    }
  }

  removeBook(book: any) {

  }

}
