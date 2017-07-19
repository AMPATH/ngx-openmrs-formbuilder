import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {NavigatorService} from '../../Services/navigator.service'

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Input() schema: any;
  @Input() pageIndex:number; //aids in collapsing the navigator elements
  @Input() sectionIndex:number; //aids in collapsing the navigator elements


  @Output() clickedElement= new EventEmitter<any>();

  constructor(private ns: NavigatorService) {
  
   }

  ngOnInit() {
    
  }

  onClicked(schema){
    this.ns.setSelectedElement(schema);
  }

}
