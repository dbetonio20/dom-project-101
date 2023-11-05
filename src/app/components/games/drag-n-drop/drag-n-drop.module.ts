import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragNDropComponent } from './drag-n-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { EndScreenModule } from '../../shared/end-screen/end-screen.module';


@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    EndScreenModule
  ],
  declarations: [DragNDropComponent],
  exports: [
    DragNDropComponent
  ],
})
export class DragNDropModule { }
