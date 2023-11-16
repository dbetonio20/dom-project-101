import { Component, ElementRef, OnInit, effect } from '@angular/core';
import { finalize } from 'rxjs';
import { GameDataService } from 'src/app/services/game-data.service';
import { WordsService } from 'src/app/services/words.service';
import { GameParentComponent } from '../game-parent/game-parent.component';

@Component({
    selector: 'drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent extends GameParentComponent {
    public dropZoneRemoveID: number[] = [1, 2, 3, 4, 5];
    public dragRemovedID: number[] = [1, 2, 3];
    public targetPosition: string[] = ['12.5%', '26.3%', '59px', '54%', '67.8%', '81.7%'];
    public dragAnswer: string = '';
    public dropTargetId: any;
    public dropDivZone: any;
    public dragItem: string = '';
    public droppedAnswerId: any;
    public isDraggedInside: boolean = false;
    public disableDrag: boolean = false;
    public showActivity = false;
    public numCorrects: number = 0;
    public numMistakes: number = 0;
    public showEndScreen: boolean = false;
    public baseScore: number = 100;
    public timePenaltyFactor: number = 5;
    public startTime: any;
    public endTime: any;



    constructor(
        private el: ElementRef,
        public wordsService: WordsService,
        private gameDataService: GameDataService
    ) {
      super()
      effect(() => {
        if(this.wordsService.hasWordData() == true){
          console.log(this.wordsService.getGameWordsData());
          this.wordsData = this.wordsService.getGameWordsData()[0].wordData;
          this.words = this.wordsService.getGameWordsData()[0].words;
        }
      });
    }

    droplist = ['drop-list0', 'drop-list1', 'drop-list2', 'drop-list3', 'drop-list4'];




    public showRandomWords(){
     const sample =  this.wordsService.getGameWordsData();
     console.log('sample Data for games: ',sample)

        // this.showLoading = true
        // this.wordsService.getRandomWordData().pipe(
        //     finalize(() => {this.showActivity = true,
        //     this.showLoading = false})
        // ).subscribe(data => {
        //     if (data && Array.isArray(data) && data.length > 0) {
        //         for (const wordData of data) {
        //             if (wordData.length > 0) {
        //                 // Get a random index within the meanings array of the current word data
        //                 const randomIndex = Math.floor(Math.random() * wordData[0].meanings.length);

        //                 // Push the random definition and word to their respective arrays
        //                 const word = wordData[0].word;
        //                 const meaning = wordData[0].meanings[randomIndex].definitions[0].definition;
        //                 // this.meanings.push(meaning);
        //                 this.words.push(word);
        //                 this.wordsData.push({ word: word, meaning: meaning })
        //             }
        //         }
        //         console.log(this.wordsData, 'wordatra');
        //         this.shuffleWords(this.wordsData);
        //         // this.shuffleWords(this.words);
        //     }
        // });
    }

    public moved(event: any, index: any) {
        this.droppedAnswerId = index;
    }

    public dragStarted(event: any) {
        this.startTime = new Date();
    }

    public itemDropped(event: any) {
        this.endTime = new Date();
        this.dragAnswer = event.previousContainer.element.nativeElement.innerText;
        this.dropDivZone = `#${event.container.id}`;
        this.dragItem = `#${event.previousContainer.id}`;
        let wordElement = this.el.nativeElement.querySelector(this.dragItem); //dragItem
        console.log('drop Item: ', this.dragItem, 'drop zone: ', this.dropDivZone);
        wordElement.style.position = 'absolute';
        wordElement.style.left = '50%';
        let eventDiv = event.container.element.nativeElement.offsetTop + 45;
        this.dropTargetId = this.dropDivZone.replace(/^\D+/g, '');
        let drag = '#wordDiv' + this.droppedAnswerId;
        let removedClass = this.el.nativeElement.querySelector(drag);
        removedClass.classList.remove('mdl-grid');
        removedClass.style.position = 'unset'
        wordElement.style.top = eventDiv + 'px';
        // wordElement.style.background = 'white'
        wordElement.style.zIndex = '1';
        this.checkAnswer();

    }

    public checkAnswer() {
        const timeDifference = this.endTime.getTime() - this.startTime.getTime();
        const timeTakenInSeconds = timeDifference / 1000;
        console.log('time in seconds: ', timeTakenInSeconds);
        let dragWord = this.el.nativeElement.querySelector(this.dragItem);
        let dropZone = this.el.nativeElement.querySelector(this.dropDivZone);

        let dragElement = dragWord.querySelector('#wordStatus');
        let dropElement = dropZone.querySelector('#targetMe');
        let correct;

        if (this.dragAnswer.trim() == this.wordsData[this.dropTargetId].word.trim()) {
            requestAnimationFrame(function () {
                dragElement.classList.add('correct');
                dropElement.classList.add('correct');
            });
            correct = true;
            this.numCorrects += 1;
            this.isDraggedInside = false;
            this.disableDrag = true;
        } else {
            requestAnimationFrame(function () {
                dragElement.classList.add('incorrect');
                dropElement.classList.add('incorrect');
            });
            correct = false;
            this.numMistakes += 1;
            this.isDraggedInside = false;
            this.disableDrag = true;
        }

        if (correct) {
            setTimeout(() => {
                dropZone.remove();
                dragWord.remove();
                this.dropZoneRemoveID.pop();
                this.disableDrag = false;
                if (this.dropZoneRemoveID.length == 0) {
                    const totalPlacements = this.numCorrects + this.numMistakes
                    const score = this.calculateScore(this.numCorrects, timeTakenInSeconds, totalPlacements);
                    this.gameDataService.setGameScore([{ corrects: this.numCorrects, mistakes: this.numMistakes, score: score }]);
                    console.log('scoree: ',score)
                    this.showEndScreen = true;
                }
            }, 2500);
        }
        else {
            setTimeout(() => {
                let drag = '#wordDiv' + this.droppedAnswerId;
                let removedClass = this.el.nativeElement.querySelector(drag);
                removedClass.classList.add('mdl-grid');
                dragElement.classList.remove('incorrect');
                dropElement.classList.remove('incorrect');
                dragWord.style.position = 'relative';
                dragWord.style.left = 'auto';
                dragWord.style.top = 'auto';

                this.disableDrag = false;
            }, 2500);
        }
    }

    public calculateScore(correctPlacements: number, timeTakenInSeconds: number, totalPlacements: number,) {
        // Calculate the time penalty
        const timePenalty = timeTakenInSeconds * this.timePenaltyFactor;

        // Calculate the total score
        const totalScore = (correctPlacements / totalPlacements) * this.baseScore - timePenalty;

        // Ensure the score doesn't go below zero
        return Math.max(totalScore, 0);
    }
}
