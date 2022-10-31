import {Component, OnInit} from '@angular/core';

import {Select, Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
import {Questions} from "../actions/app.actions";

@Component({
  selector: 'app-resultdashboard',
  templateUrl: './resultdashboard.component.html',
  styleUrls: ['./resultdashboard.component.scss']
})
export class ResultdashboardComponent implements OnInit {

  @Select(AppState.getUserPoints) $userPoints: Observable<number> | undefined;
  @Select(AppState.getMaxPoints) $maxPoints: Observable<number> | undefined;
  @Select(AppState.getUsername) $username: Observable<number> | undefined;

  maxPoints:number=0;
  userPoints:number=0;
  percentage:number=0
  constructor(private store: Store) {
  }

  calcProgressValue( userPoints:number|null, maxPoints:number|null){
    if(!maxPoints || !userPoints) return 0;
    return (userPoints/maxPoints)*100;
  }
  ngOnChanges(){
    this.percentage=(this.userPoints/this.maxPoints)*100;
  }

  ngOnInit(): void {
   this.$maxPoints?.subscribe(maxPoínts=>{
      this.maxPoints=maxPoínts
    })
    this.$maxPoints?.subscribe(maxPoints=>{
      this.userPoints=maxPoints
    })
  }
}
