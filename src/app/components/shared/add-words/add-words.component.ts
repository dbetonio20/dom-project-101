import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { WordsService } from 'src/app/services/words.service';
import { GameParentComponent } from '../../games/game-parent/game-parent.component';

@Component({
  selector: 'add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css'],
  imports: [ FormsModule, MatProgressSpinnerModule, CommonModule ],
  standalone: true
})
export class AddWordsComponent extends GameParentComponent {


  constructor(public wordsService: WordsService) {
    super();
  }


  public showWord(words: string) {
    let array = words.split(',').map(item => item.trim());
    this.showLoading = true
    this.wordsService.getWordData(array).pipe(
        finalize(() => this.showLoading = false)
    ).subscribe(data => {
        if (data && Array.isArray(data) && data.length > 0) {
            for (const wordData of data) {
                if (wordData.length > 0) {
                    // Get a random index within the meanings array of the current word data
                    const randomIndex = Math.floor(Math.random() * wordData[0].meanings.length);

                    // Push the random definition and word to their respective arrays
                    const word = wordData[0].word;
                    const meaning = wordData[0].meanings[randomIndex].definitions[0].definition;
                    // this.meanings.push(meaning);
                    this.words.push(word);
                    this.wordsData.push({ word: word, meaning: meaning })
                    this.wordsService.setGameWordsData({wordData: this.wordsData, words: this.words});
                }
            }
            console.log(this.wordsData, 'wordatra');
            this.shuffleWords(this.wordsData);
            // this.shuffleWords(this.words);
        }
    });
}

public showRandomWords(){
    this.showLoading = true;
    this.wordsService.getRandomWordData().pipe(
        finalize(() => {this.showLoading = false})
    ).subscribe(data => {
        if (data && Array.isArray(data) && data.length > 0) {
            for (const wordData of data) {
                if (wordData.length > 0) {
                    // Get a random index within the meanings array of the current word data
                    const randomIndex = Math.floor(Math.random() * wordData[0].meanings.length);

                    // Push the random definition and word to their respective arrays
                    const word = wordData[0].word;
                    const meaning = wordData[0].meanings[randomIndex].definitions[0].definition;
                    // this.meanings.push(meaning);
                    this.words.push(word);
                    this.wordsData.push({ word: word, meaning: meaning })
                    this.wordsService.setGameWordsData({wordData: this.wordsData, words: this.words});
                }
            }
            console.log(this.wordsData, 'wordatra');
            this.shuffleWords(this.wordsData);
            // this.shuffleWords(this.words);
        }
    });
}

public shuffleWords(words: any) {

    let currentIndex = words.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [words[currentIndex], words[randomIndex]] = [
            words[randomIndex], words[currentIndex]];
    }

    return words;
}

}
