import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConceptService } from './../Services/openmrs-api/concept.service';
@Component({
  selector: 'app-concept-search',
  templateUrl: './concept-search.component.html',
  styleUrls: ['./concept-search.component.css']
})
export class ConceptSearchComponent implements OnInit {

  public searchValue = '';
  public concept: any;

  constructor(private conceptService: ConceptService, private router: Router) {
  }


  ngOnInit() {
  }

  public searchConcept(){
     const conceptUuid = this.searchValue;
     this.conceptService.searchConceptByUUID(conceptUuid)
     .subscribe((result) => {
       console.log('concept result', result);
       this.concept = result;
     });
  }

  public reset(){
    this.searchValue =  '';
  }
  public navigateToForms(){
    this.router.navigate(['./']);

  }



}
