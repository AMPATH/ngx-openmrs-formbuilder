import { Component, OnInit } from '@angular/core';
import * as env from '../../environments/environment';
@Component({
  selector: 'app-build-version-footer',
  templateUrl: './build-version-footer.component.html',
  styleUrls: ['./build-version-footer.component.css']
})
export class BuildVersionFooterComponent implements OnInit {

  date: string;
<<<<<<< bf0743308bba6ccfbdf2e91941974edc11d12637
<<<<<<< 845710052d3fc4fa05cf93679480800954b1c76f
  version: string;
=======

>>>>>>> bug fixes
=======
  version: string;
>>>>>>> added ability to download schemas
  constructor() { }

  ngOnInit() {
    const d = new Date( +env.environment.date );
    this.date = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    this.version = env.environment.version;
  }

}
