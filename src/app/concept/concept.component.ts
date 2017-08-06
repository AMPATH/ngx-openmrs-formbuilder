import { Component, OnInit, Input} from '@angular/core';
import {ConceptService} from '../Services/concept.service'

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {
@Input() question:any;
@Input() form:any;
@Input() answers:any;

  constructor(private cs:ConceptService) { }

  ngOnInit() {
    
  }

  searchConcept(){

  }

}
