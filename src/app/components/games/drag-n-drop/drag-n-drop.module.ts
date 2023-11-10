import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragNDropComponent } from './drag-n-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { EndScreenComponent } from '../../shared/end-screen/end-screen.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    EndScreenComponent,
    MatProgressSpinnerModule
  ],
  declarations: [DragNDropComponent],
  exports: [
    DragNDropComponent
  ],
})
export class DragNDropModule { }
