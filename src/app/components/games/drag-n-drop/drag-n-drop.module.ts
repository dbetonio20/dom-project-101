import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragNDropComponent } from './drag-n-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { EndScreenComponent } from '../../shared/end-screen/end-screen.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddWordsComponent } from '../../shared/add-words/add-words.component';


@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    EndScreenComponent,
    MatProgressSpinnerModule,
    AddWordsComponent
  ],
  declarations: [DragNDropComponent],
  exports: [
    DragNDropComponent
  ],
})
export class DragNDropModule { }
