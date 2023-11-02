import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {

    public words = ['car','load','key'];
    public meanings = ['car is a car', 'loading here loading there', 'key of all is the key'];
    constructor() { }
    droplist = ['drop-list0', 'drop-list1', 'drop-list2', 'drop-list3', 'drop-list4', 'drop-list5'];
    ngOnInit() {
    }


    public moved(event : any, index : any) {
      let  droppedAnswerId = index;
      console.log("moved", droppedAnswerId);
  }

  public  itemDropped(event: any) {
  console.log('drop',event)
  }
}
