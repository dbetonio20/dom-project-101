import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-parent',
  templateUrl: './game-parent.component.html',
  styleUrls: ['./game-parent.component.css'],
  standalone: true
})
export class GameParentComponent implements OnInit {
  public inputText: string = '';
  public wordsData: any[] = [];
  public words: string[] = [];
  public meanings: string[] = [];
  public showLoading: boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
