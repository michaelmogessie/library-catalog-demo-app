import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-book-list-dialog',
  templateUrl: './share-book-list-dialog.component.html',
  styleUrls: ['./share-book-list-dialog.component.scss']
})
export class ShareBookListDialogComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  constructor(public dialogRef: MatDialogRef<ShareBookListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  selectedBooks: [] = []
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
