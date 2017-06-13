import { NgModule }      from '@angular/core';
import {
  ButtonModule, SliderModule, PanelModule, InputTextModule, DataTableModule, MessagesModule, ConfirmDialogModule,
  ConfirmationService, PaginatorModule, GMapModule, DataListModule, DialogModule, InputSwitchModule
}  from 'primeng/primeng';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";



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
    InputSwitchModule,
    NoopAnimationsModule
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
    InputSwitchModule,
    NoopAnimationsModule
  ]
})
export class PrimengModule { }
