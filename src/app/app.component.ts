
import { Component } from '@angular/core';
import {Actions, Select, Selector, Store} from '@ngxs/store';
import {Questions} from "./actions/app.actions";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../services/questionService";
import {AppState, AppStateModel} from "./state/app.state";
import {Observable} from "rxjs";
import {IQuestion} from "./models/questions.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-quiz';
  questionService=new QuestionService();
  questions:IQuestion[]=[];
  stepgrps: FormGroup<{firstCtrl: FormControl<string | null>}>[]=[];
  currentStep = 0;
  //State
  @Select() app$: Observable<AppState>| undefined
  @Select(AppState.getQuestions) $questions: Observable<IQuestion[]>|undefined;


  mainFormGroup = this._formBuilder.group({
    formCount: 1,
    stepData: this._formBuilder.array([
      this._formBuilder.group({
        name: ["", Validators.required]
      })
    ])
  });
  firstFormGroup = this._formBuilder.group({
    "firstCtrl": ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    "secondCtrl": ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    "thirdCtrl": ['', Validators.required],
  });



  constructor(private _formBuilder: FormBuilder,private store: Store ,actions$:Actions) {

  }


  ngOnInit() {
    this.store.dispatch(new Questions.FetchQuestions()).subscribe(result=>{
      console.log("q",result);
      this.questions=result;
    })

  }

}

