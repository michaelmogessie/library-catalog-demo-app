import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteBookConfirmDialogComponent } from './delete-book-confirm-dialog/delete-book-confirm-dialog.component';
import { LogoutConfirmDialogComponent } from './logout-confirm-dialog/logout-confirm-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ShareBookListDialogComponent } from './share-book-list-dialog/share-book-list-dialog.component';

const BASE_URL = "https://library-catalog-demo-app.herokuapp.com"
//const BASE_URL = "http://localhost:8885"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'library-catalog-demo-app';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  loggedIn: any = localStorage.getItem('user') ? true : false;
  user: any = this.loggedIn ? JSON.parse(localStorage.getItem('user')!) : {}
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  password = new FormControl('', [Validators.required]);
  ngOnInit(): void {
    if (this.loggedIn) {
      this.user = JSON.parse(localStorage.getItem('user')!)
    }
  }

  login() {
    let credentials = { 'email': this.email.value, 'password': this.password.value }
    this.http.post(BASE_URL + '/login', credentials, { observe: 'response' }).subscribe((response: any) => {
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
        this._snackBar.open(error.error, "OK", {
          duration: 3000
        });
      });

  }

  saveBook(theBook: any) {
    this.http.post(BASE_URL + '/books/add', theBook, this.getRequestOptions()).subscribe((response: any) => {
      let savedBook = response.body
      let newBook = true;
      for (let book of this.user.books) {
        if (book.id == theBook.id) {
          book.title = theBook.title
          book.author = theBook.author
          book.purchased_on = theBook.purchased_on
          book.notes = theBook.notes
          localStorage.setItem('user', this.user)
          newBook = false;
          break;
        }
      }
      if (newBook) {
        this.user.books[0].id = savedBook.id
        localStorage.setItem('user', this.user)
      }
      this._snackBar.open('Success', 'OK', {
        duration: 3000
      });
    },
      (error) => {
        this._snackBar.open(error.error, "OK", {
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

  removeBook(bookToDelete: any) {
    const dialogRef = this.dialog.open(DeleteBookConfirmDialogComponent, {
      width: '700px',
      data: { author: bookToDelete.author, title: bookToDelete.title }
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        let options: any = this.getRequestOptions()
        options.body = bookToDelete
        options.responseType = 'text'
        this.http.delete(BASE_URL + '/books/remove', options).subscribe((response) => {
          let index = 0

          for (let book of this.user.books) {
            if (book.id == bookToDelete.id) {
              break;
            }
            index += 1
          }
          this.user.books.splice(index, 1)
          localStorage.setItem('user', this.user)
          this._snackBar.open("Book removed.", "OK", {
            duration: 3000
          });
        },
          (error) => {
            this._snackBar.open(error.error, "OK", {
              duration: 3000
            });
          });
      }
    });

  }

  shareBookList() {
    const dialogRef = this.dialog.open(ShareBookListDialogComponent, {
      width: '700px',
      data: this.user.books
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let options: any = this.getRequestOptions()
        options.responseType = 'text'
        this.http.post(BASE_URL + '/books/share', result, options).subscribe((response) => {
          this._snackBar.open("Book list shared with " + result.share_with_email + ".", "OK", {
            duration: 3000
          });
        },
          (error) => {
            this._snackBar.open(error.error, "OK", {
              duration: 3000
            });
          });
      }
    });
  }

  newBook() {
    let book = {
      'title': 'New book',
      'author': '',
      'purchased_on': '',
      'notes': ''
    }

    this.user.books.unshift(book)
  }

  register() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '700px',
      data: this.user.books
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let options: any = this.getRequestOptions()
        options.responseType = 'text'
        this.http.post(BASE_URL + '/register', result, options).subscribe((response) => {
          this._snackBar.open("Success. Please check your email for verification link.", "OK", {
            duration: 3000
          });
        },
          (error) => {
            this._snackBar.open(error.error, "OK", {
              duration: 3000
            });
          });
      }
    });
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutConfirmDialogComponent, {
      width: '700px'
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        let options: any = this.getRequestOptions()
        options.responseType = 'text'
        this.http.post(BASE_URL + '/logout', this.user, options).subscribe((response) => {
          this.user = {}
          localStorage.removeItem('user')
          localStorage.removeItem('auth_token')
          this.loggedIn = false
          this._snackBar.open("You're logged out.", "OK", {
            duration: 3000
          });
        },
          (error) => {
            this._snackBar.open(error.error, "OK", {
              duration: 3000
            });
          });
      }
    });
  }

}
