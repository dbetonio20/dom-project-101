import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordsService } from 'src/app/services/words.service';

@Component({
    selector: 'drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {
    public words = ['car', 'load', 'key'];
    public meanings = ['car is a car', 'loading here loading there', 'key of all is the key'];
    public dropZoneRemoveID: number[] = [1, 2, 3];
    public dragRemovedID: number[] = [1, 2, 3];
    public targetPosition: string[] = ['12.5%', '26.3%', '59px', '54%', '67.8%', '81.7%'];
    public dragAnswer: string = '';
    public dropTargetId: any;
    public dropDivZone: any;
    public dragItem: string = '';
    public droppedAnswerId: any;
    public isDraggedInside: boolean = false;
    public disableDrag: boolean = false;

    constructor(
        private el: ElementRef,
        private wordsService: WordsService
    ) { }
    droplist = ['drop-list0', 'drop-list1', 'drop-list2'];
    ngOnInit() {
    }

    public showWord() {
        this.wordsService.getWordData('sample').subscribe(data => console.log(data));
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
        if (this.meanings[this.dropTargetId] != this.dragAnswer) {
            requestAnimationFrame(function () {
                dragElement.classList.add('correct');
                dropElement.classList.add('correct');
            });
            correct = true;
            this.isDraggedInside = false;
            this.disableDrag = true;
        } else {
            requestAnimationFrame(function () {
                dragElement.classList.add('incorrect');
                dropElement.classList.add('incorrect');
            });
            correct = false
            this.isDraggedInside = false;
            // this.isCorrect = false;
            this.disableDrag = true;


        }


        if (correct) {
            setTimeout(() => {
                dropZone.remove();
                dragWord.remove();
                this.disableDrag = false;
                if (this.dropZoneRemoveID.length == 0) {

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
