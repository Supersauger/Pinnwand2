import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { PinComponent } from './pin/pin.component';
import { BigPinComponent } from './big-pin/big-pin.component';

@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    BigPinComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  exports: [DragDropModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
