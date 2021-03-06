import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {
  data: any;

  constructor(public http: Http) {
    console.log('Hello RestapiServiceProvider Provider');
  }
  getData() {
   this.http.get("https://polar-tundra-62358.herokuapp.com/calculatePanchang?dd=12&mm=3&yy=2017&hr=12&zhr=0").subscribe(data=>console.log("this is data " , data));
  }
  
  

  load(mydate:string) {
   
    var date = new Date(mydate);
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      var hours = date.getHours() + date.getMinutes()/60;
      //this.http.get('https://polar-tundra-62358.herokuapp.com/calculatePanchang?dd=12&mm=3&yy=2017&hr=12&zhr=0')
      this.http.get('https://polar-tundra-62358.herokuapp.com/calculatePanchang?dd=' +
       date.getDate() + '&mm=' + date.getMonth() +  '&yy=' + date.getFullYear() +  '&hr=' + hours + 
       '&zhr=' + date.getTimezoneOffset()/60)
        .map(res => res.json())
        .subscribe((data) => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
