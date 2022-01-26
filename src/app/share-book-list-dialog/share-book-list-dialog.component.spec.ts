import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBookListDialogComponent } from './share-book-list-dialog.component';

describe('ShareBookListDialogComponent', () => {
  let component: ShareBookListDialogComponent;
  let fixture: ComponentFixture<ShareBookListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareBookListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBookListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
