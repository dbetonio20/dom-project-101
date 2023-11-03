import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {
    public words = ['car', 'load', 'key'];
    public meanings = ['car is a car', 'loading here loading there', 'key of all is the key'];
    public dropZoneRemoveID: number[] = [1,2,3];
    public dragRemovedID: number [] = [1,2,3];
    public targetPosition: string[] = ['12.5%', '26.3%', '59px', '54%', '67.8%', '81.7%'];
    public dragAnswer: string = '';
    public dropTargetId: any;
    public dropDivZone: any;
    public dragItem: string = '';
    public droppedAnswerId: any;

    constructor(
        private el: ElementRef
    ) { }
    droplist = ['drop-list0', 'drop-list1', 'drop-list2'];
    ngOnInit() {
    }


    public moved(event: any, index: any) {
        this.droppedAnswerId = index;
    }

    public itemDropped(event: any) {
        this.dragAnswer = event.previousContainer.element.nativeElement.innerText;
        this.dropDivZone = `#${event.container.id}`;
        this.dragItem = `#${event.previousContainer.id}`;
        let wordElement = this.el.nativeElement.querySelector(this.dragItem); //dragItem
        console.log('drop Item: ',this.dragItem, 'drop zone: ',this.dropDivZone);
        wordElement.style.position = 'fixed';
        wordElement.style.right = '109vh';
        let eventDiv = 44.5 + event.container.element.nativeElement.offsetTop;
        let divPosition;
        this.dropTargetId = this.dropDivZone.replace(/^\D+/g, '');
        let drag = '#wordDiv' + this.droppedAnswerId;
        let removedClass = this.el.nativeElement.querySelector(drag);
        removedClass.classList.remove('mdl-grid');
        wordElement.style.top = eventDiv + 'px';
        wordElement.style.background = 'white'
        this.checkAnswer();

    }

    public checkAnswer(){
        let dragWord = this.el.nativeElement.querySelector(this.dragItem);
        let dropZone = this.el.nativeElement.querySelector(this.dropDivZone);

        let dragElement = dragWord.querySelector('#wordStatus');
        let dropElement = dropZone.querySelector('#targetMe');
        let correct;
        if(this.meanings[this.dropTargetId] == this.dragAnswer){
            console.log('sample')
            correct = true;

        }else{
            requestAnimationFrame(function () {
                dragElement.classList.add('incorrect');
                dropElement.classList.add('incorrect');
            });
            correct = false

        }


        if (correct) {
            setTimeout(() => {
                dropZone.remove();
                dragWord.remove();

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
                dragWord.style.right = '0px'
            }, 2500);
        }

    }
}
