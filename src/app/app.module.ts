import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialsModule } from './materials/materials.module';
import { DeleteBookConfirmDialogComponent } from './delete-book-confirm-dialog/delete-book-confirm-dialog.component';
import { ShareBookListDialogComponent } from './share-book-list-dialog/share-book-list-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { LogoutConfirmDialogComponent } from './logout-confirm-dialog/logout-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteBookConfirmDialogComponent,
    ShareBookListDialogComponent,
    RegisterDialogComponent,
    LogoutConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    MaterialsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
