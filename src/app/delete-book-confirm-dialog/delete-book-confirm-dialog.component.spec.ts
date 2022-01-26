import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookConfirmDialogComponent } from './delete-book-confirm-dialog.component';

describe('DeleteBookConfirmDialogComponent', () => {
  let component: DeleteBookConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteBookConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
