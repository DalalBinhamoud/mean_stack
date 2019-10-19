import { Component, OnInit } from '@angular/core';
import { HttpService}  from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dalal';
  Tasks : any;
  constructor(private _httpService:HttpService){

  }
  ngOnInit(){
    this.getTasksFromService()
    
  }
  getTasksFromService(){
     let observavle = this._httpService.getTask()
      observavle.subscribe(data =>{
        console.log("here are tasks!", data)
        this.Tasks = data;
        console.log("here my tasks!", this.Tasks)
      })
  }

}
