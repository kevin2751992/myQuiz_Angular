import {Component, Input, OnInit} from '@angular/core';
import {IAnswer, IQuestion, QuestionTypeEnum} from "../models/questions.model";
import {Select, Store} from "@ngxs/store";
import {Questions} from "../actions/app.actions";
import {Observable} from "rxjs";
import {AppState} from "../state/app.state";



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
  constructor(private store: Store ) {

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
  isMULTIPLE_CHECKBOX_CHOICE(type:QuestionTypeEnum):boolean{
    return type===QuestionTypeEnum.MULTIPLE_CHECKBOX_CHOICE
  }
  ngOnChanges(){
  /*  this.$questions?.subscribe(result=>{
      console.log("questions were updated",result)
      //this.question=result[this.index];

    })*/
  }

  ngOnInit(): void {
  }


  selected(option: IAnswer, index:number) {
    if(!option || !this.question) return;
    console.log("selected",option);
    this.question.userAnswer=option;
    console.log("updated Question",this.question)
    this.store.dispatch(new Questions.SetQuestion({updatedQuestion:this.question, index:index}));
  }
}
