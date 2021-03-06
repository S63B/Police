import { NgModule }      from '@angular/core';
import {
  ButtonModule, SliderModule, PanelModule, InputTextModule, DataTableModule, MessagesModule, ConfirmDialogModule,
  ConfirmationService, PaginatorModule, GMapModule, DataListModule, DialogModule, InputSwitchModule
}  from 'primeng/primeng';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports:      [
    ButtonModule,
    SliderModule,
    PanelModule,
    InputTextModule,
    DataTableModule,
    MessagesModule,
    ConfirmDialogModule,
    PaginatorModule,
    GMapModule,
    DataListModule,
    DialogModule,
    BrowserAnimationsModule,
    InputSwitchModule
  ],
  providers:    [ ConfirmationService ],
  exports:[
    ButtonModule,
    SliderModule,
    PanelModule,
    InputTextModule,
    DataTableModule,
    MessagesModule,
    ConfirmDialogModule,
    PaginatorModule,
    GMapModule,
    DataListModule,
    DialogModule,
    BrowserAnimationsModule,
    InputSwitchModule
  ]
})
export class PrimengModule { }
