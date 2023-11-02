import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragNDropComponent } from './drag-n-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CommonModule,
    DragDropModule
  ],
  declarations: [DragNDropComponent],
  exports: [
    DragNDropComponent
  ]
})
export class DragNDropModule { }
