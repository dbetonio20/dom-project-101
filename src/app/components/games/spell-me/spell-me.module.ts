import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellMeComponent } from './spell-me.component';
import { MatIconModule } from '@angular/material/icon';
import { AddWordsComponent } from '../../shared/add-words/add-words.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    AddWordsComponent
  ],
  declarations: [
    SpellMeComponent
  ],
  exports: [
    SpellMeComponent
  ]
})
export class SpellMeModule { }
