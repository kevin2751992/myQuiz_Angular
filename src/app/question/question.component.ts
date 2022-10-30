import {Component, Input, OnInit} from '@angular/core';
import {IAnswer, IQuestion, QuestionTypeEnum} from "../models/questions.model";
import {Select} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question:IQuestion |undefined;
  //@Input() index:number=0;
  @Select(AppState.getQuestions) $questions: Observable<IQuestion[]>|undefined;
  userAnswer:any;
  //question:IQuestion|undefined
  //question:IQuestion;
  constructor() {

  }

//--Helper function for cond rendering --//
  favoriteSeason: any;
  isTypeTextField(type:QuestionTypeEnum):boolean{
    return type===QuestionTypeEnum.TEXTFIELD
  }
  isTypeMULTIPLE_CHECKBOX_CHOICE(type:QuestionTypeEnum):boolean{
    return type===QuestionTypeEnum.MULTIPLE_CHECKBOX_CHOICE
  }
  isSINGLE_RADIO_SELECTION(type:QuestionTypeEnum):boolean{
    return type===QuestionTypeEnum.SINGLE_RADIO_SELECTION
  }

  ngOnInit(): void {
    console.log("q",this.question)
    this.$questions?.subscribe(result=>{
      //this.question=result[this.index];

    })
  }


  selected(ecent:any,option: IAnswer) {
    console.log("selected",option);
  }
}
