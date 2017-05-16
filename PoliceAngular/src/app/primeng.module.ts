import { NgModule }      from '@angular/core';
import {
  ButtonModule, SliderModule, PanelModule, InputTextModule, DataTableModule, MessagesModule, ConfirmDialogModule,
  ConfirmationService, PaginatorModule, GMapModule,
}  from 'primeng/primeng';


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
    GMapModule
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
    GMapModule
  ]
})
export class PrimengModule { }
