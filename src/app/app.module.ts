import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
