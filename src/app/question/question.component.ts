import {Component, Input, OnInit} from '@angular/core';
import {IAnswer, IQuestion, QuestionTypeEnum} from "../models/questions.model";
import {Select, Store} from "@ngxs/store";
import {Questions} from "../actions/app.actions";
import {filter, Observable} from "rxjs";
import {AppState} from "../state/app.state";
import {MatCheckboxChange} from "@angular/material/checkbox";



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question:IQuestion |undefined;
  @Input() index:number=0;
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
  isDROPDOWN(type:QuestionTypeEnum):boolean{
    return type===QuestionTypeEnum.DROPDOWN
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
    this.question.userAnswer=[option];
    console.log("updated Question",this.question);
    console.log("updated Question",index)
    this.store.dispatch(new Questions.SetQuestion({updatedQuestion:this.question, index:this.index}));
  }

  handleCheckboxChange($event: MatCheckboxChange, answer:IAnswer) {
    console.log(this.question)
    let indexOfAnswer= this.question!.userAnswer.indexOf(answer); // check if the answer already exists
    // if answer was checked
    if($event.checked){
      //and not already exits
      if(indexOfAnswer===-1){
        this.question?.userAnswer?.push(answer) //add
      }
    }
    //if Checkbox was unselected
    if(!$event.checked){
      //and answer was found
      if(indexOfAnswer>-1){
        this.question?.userAnswer?.splice(indexOfAnswer,1) // remove
      }
    }
  }

  selectChange(optionValue:string) {
    if(!this.question) return
    let useranswer= this.question.answers?.filter(answer=>answer.value===optionValue)[0];
    if(useranswer){
      this.question.userAnswer=[useranswer];
    }
    this.store.dispatch(new Questions.SetQuestion({updatedQuestion:this.question, index:this.index}));
  }
}
