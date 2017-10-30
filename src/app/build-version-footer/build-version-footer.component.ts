import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-build-version-footer',
  templateUrl: './build-version-footer.component.html',
  styleUrls: ['./build-version-footer.component.css']
})
export class BuildVersionFooterComponent implements OnInit {

  date: string;

  constructor() { }

  ngOnInit() {
    // this.date = new Date().getMonth() +"/"+new Date().getDate() +"/"+new Date().getFullYear()+"/" + " "+new Date().toLocaleTimeString();
  }

}
