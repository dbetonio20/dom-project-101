import { Component, ElementRef, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { GameDataService } from 'src/app/services/game-data.service';
import { WordsService } from 'src/app/services/words.service';

@Component({
    selector: 'drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {
    public inputText: string = '';
    public wordsData: any [] = [];
    public words: string [] = [];
    public meanings: string [] = [];
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

    constructor(
        private el: ElementRef,
        private wordsService: WordsService,
        private gameDataService: GameDataService
    ) { }

    droplist = ['drop-list0', 'drop-list1', 'drop-list2', 'drop-list3', 'drop-list4'];

    ngOnInit() {
    }

    public showWord(words: string) {
              let array = words.split(',').map(item => item.trim());

            this.wordsService.getWordData(array).pipe(
              finalize(() => this.showActivity = true)
            ).subscribe(data => {
                if (data && Array.isArray(data) && data.length > 0) {
                    for(const wordData of data){
                        if (wordData.length > 0) {
                            // Get a random index within the meanings array of the current word data
                            const randomIndex = Math.floor(Math.random() * wordData[0].meanings.length);

                            // Push the random definition and word to their respective arrays
                            const word = wordData[0].word;
                            const meaning = wordData[0].meanings[randomIndex].definitions[0].definition;
                            // this.meanings.push(meaning);
                            this.words.push(word);
                            this.wordsData.push({ word: word ,meaning: meaning})
                        }
                    }
                    console.log(this.wordsData,'wordatra');
                    this.shuffleWords(this.wordsData);
                    // this.shuffleWords(this.words);
                }
            });
    }

    public shuffleWords(words : any) {

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

    public moved(event: any, index: any) {
        this.droppedAnswerId = index;
    }

    public itemDropped(event: any) {
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
        wordElement.style.background = 'white'
        wordElement.style.zIndex = '1';
        this.checkAnswer();

    }

    public checkAnswer() {
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
                  this.gameDataService.setGameScore([{corrects: this.numCorrects, mistakes: this.numMistakes}]);
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
                // dragWord.style.right = '0px'

                this.disableDrag = false;
            }, 2500);
        }

    }
}
