import { Component } from '@angular/core';

import {FormBuilder, Validators} from "@angular/forms";
import {QuestionService} from "../services/questionService";
import {BehaviorSubject} from "rxjs";
import {IQuestion} from "./question/iquestion";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-quiz';
  questionService=new QuestionService();
  //State
  private readonly _questionsSrc = new BehaviorSubject<IQuestion[]|undefined>([]);
  readonly questions$ = this._questionsSrc.asObservable(); // can be exposed -> todo


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  // Get last value without subscribing to the puppies$ observable (synchronously).
  public getQuestionState(): IQuestion[] | undefined{
    return this._questionsSrc.getValue();
  }

  private _setQuestionsState(questions: IQuestion[]): void {
    this._questionsSrc.next(questions);
  }

  constructor(private _formBuilder: FormBuilder) {

  }
  private async getQuestions(){
    let [questions,error] = await this.questionService.fetchQuestions();
    if(questions){
      this._setQuestionsState(questions)
    }
  }

  ngOnInit(){
    this.getQuestions();
  }

}
