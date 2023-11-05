import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameDataService {
    private totalCorrects: number = 0;
    private totalMistakes: number = 0;

    public setGameScore(scoreData: any){
        this.totalCorrects = scoreData[0].corrects;
        this.totalMistakes = scoreData[0].mistakes;
    }

    public getGameScore() {
        const scoreData = [{corrects: this.totalCorrects, mistakes: this.totalMistakes}]
        return scoreData;
    }

}
