import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'audit-info',
  templateUrl: './audit-info.component.html',
  styleUrls: ['./audit-info.component.css']
})
export class AuditInfoComponent implements OnInit {

  formMetadata:any;

  @Input() set _formMetadata(formMetadata){
    this.formMetadata = formMetadata;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
