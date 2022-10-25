import {Component, Input, OnInit} from '@angular/core';
import {IQuestion, QuestionTypeEnum, SelectionModeEnum} from "./iquestion"
import {Observable} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question:IQuestion|undefined

  userAnswer:any;
  //question:IQuestion;
  constructor() {
    console.log("create q",this.question)
  }
  ngOnInit(): void {
  }



}
