import { Component, OnInit, effect } from '@angular/core';
import { WordsService } from 'src/app/services/words.service';
import { GameParentComponent } from '../game-parent/game-parent.component';

@Component({
  selector: 'spell-me',
  templateUrl: './spell-me.component.html',
  styleUrls: ['./spell-me.component.css']
})
export class SpellMeComponent extends GameParentComponent {
  public items = ['C','A','R']

  constructor(public wordsService: WordsService) {
    super()
    effect(() => {
      if(this.wordsService.hasWordData() == true){
        console.log(this.wordsService.getGameWordsData());
        this.wordsData = this.wordsService.getGameWordsData()[0].wordData;
        this.words = this.wordsService.getGameWordsData()[0].words;

      }
    });
   }



  sample(){
    const textToPlay = this.wordsData[0].word + ' '+ this.wordsData[0].meaning;
    const synth = speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(textToPlay);

    synth.speak(utterThis)
  }
}
