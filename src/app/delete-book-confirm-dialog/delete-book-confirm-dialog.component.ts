import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-book-confirm-dialog',
  templateUrl: './delete-book-confirm-dialog.component.html',
  styleUrls: ['./delete-book-confirm-dialog.component.scss']
})
export class DeleteBookConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteBookConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
