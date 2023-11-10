import { Component, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
    selector: 'end-screen',
    templateUrl: './end-screen.component.html',
    styleUrls: ['./end-screen.component.css'],
    standalone: true
})
export class EndScreenComponent implements OnInit {
  public corrects: number = 0;
  public mistakes: number = 0;

  constructor(
    private gameDataService : GameDataService
  ) { }

  ngOnInit() {
    const scoreData = this.gameDataService.getGameScore();
    this.mistakes = scoreData[0].mistakes;
    this.corrects = scoreData[0].corrects;
    console.log(scoreData[0]);
  }

}
