
import { Component } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Questions, Stepps} from "./actions/app.actions";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../services/questionService";
import {AppState} from "./state/app.state";
import {Observable} from "rxjs";
import {IQuestion, QuestionTypeEnum} from "./models/questions.model";

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
  @Select(AppState.getUsername) $username: Observable<string>|undefined;
  @Select(AppState.getCurrentStep) $currentStep: Observable<number>|undefined;


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



  constructor(private _formBuilder: FormBuilder,private store: Store ) {

  }
  showNextButton(question:IQuestion):boolean{
    // if we have multi select
    if(!(question.type===QuestionTypeEnum.MULTIPLE_CHECKBOX_CHOICE)){
      return true
    }
    return question.userAnswer.length>0

  }

  ngOnInit() {

    this.store.dispatch(new Questions.FetchQuestions).subscribe(result=>{

      this.store.dispatch(new Questions.CalculateMaxPoints)
    })
  }

  calcProgressValue(data: { step: number | null; questions: IQuestion[] | null }){
    if(!data.questions || !data.step )return 0;

    let value=(data.step/(data.questions.length-1))*100
    console.log("value",value)
    return value
  }

  nextQuestion(){
    console.log("next")
    this.updateUserPoints();
    this.store.dispatch(new Stepps.IncrementStep());
  }
  updateUserPoints() {
    this.store.dispatch(new Questions.CalculateUserPoints).subscribe(result=>{
      console.log("updated",result)
    })
  }

  showProgressBar(data: { step: number | null; questions: IQuestion[] | null }) {
    if(!data.questions || !data.step) return false;
    return data.step>0 && data.step<data.questions.length ;
  }

  showProgressLabel(data: { questions: IQuestion[] | null; step: number | null }) {
    if(!data.questions || !data.step) return "";
    return `Question ${data.step} out of ${(data.questions?.length-1)}`
  }
}

