import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) {
   // this.getTask()
   }
   getTask(){
    // let tempObservable =this._http.get('/tasks');
   return this._http.get('/tasks');
    // tempObservable.subscribe(data => console.log("got out tasks!",data));
   }

}
