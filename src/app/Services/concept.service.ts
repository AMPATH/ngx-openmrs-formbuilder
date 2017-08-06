import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
declare var System:any;
@Injectable()
export class ConceptService {
  
  parseString = System.import('../../../node_modules/xml2js/lib/xml2js.js')
  
  private url:string = "https://test2.ampath.or.ke:8443/amrs/ws/rest/v1/concept/"
  constructor(private http:Http) { }

  searchConcept(conceptID:string){
      return this.http.get(this.url+conceptID+"v=custom:(uuid,name,conceptClass,setMembers)").subscribe(
        xml => {
            this.parseString.parseString(xml, function (err, result) {
            console.log(result);
})
        }
      )
  }

}
