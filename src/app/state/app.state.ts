import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IQuestion } from './../models/questions.model'
import {Questions} from '../actions/app.actions'
import {Injectable} from "@angular/core";
import {QuestionService} from "../../services/questionService";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export enum AppStateEnum{
  Loading,
  Success,
  Error,
  Warning

}
export class AppStateModel {
  questions: IQuestion[] | undefined;
  userPoints:number=0;
  steps:FormGroup<{grpName: FormControl<string | null>}>[] | undefined=[];
  appstate:AppStateEnum=AppStateEnum.Loading;

}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    questions: undefined,
    steps:[],
    userPoints:0,
    appstate:AppStateEnum.Loading
  }
})
@Injectable()
export class AppState{
  questionService:QuestionService=new QuestionService();
  constructor() {
  }
  @Selector()
  static getQuestions(state:AppStateModel){
    return state.questions
  }
  @Selector()
  static getQuestion(state:AppStateModel,index:number){
    if(!state.questions || index>state.questions.length)return;
    return state.questions[index]
  }
  @Action(Questions.SetQuestions)
  setQuestions(ctx:StateContext<AppStateModel>,{payload}:Questions.SetQuestions){
    console.log("test")
    ctx.patchState({
      questions:[...payload]
    })
  }
  @Action(Questions.SetQuestions)
  setQuestion(ctx:StateContext<AppStateModel>,{payload}:Questions.SetQuestion){
    console.log("here1")
    let currstate =ctx.getState()
    let tmpCopy:IQuestion[]=[];
    if(currstate.questions){
      let tmpCopy=[...currstate.questions];
      tmpCopy[payload.index]=payload.updatedQuestion
    }
    console.log("Update Question",tmpCopy)
    ctx.patchState({
      questions:[...tmpCopy]
    })
    console.log("updated Questions",ctx.getState())
  }

  @Action(Questions.FetchQuestions)
  async fetchQuestions(ctx:StateContext<AppStateModel>){
    console.log("here")
    let [questions,error]=await this.questionService.fetchQuestions();
    if(error){
      ctx.patchState({
        appstate:AppStateEnum.Error
      })
      return
    }
    ctx.patchState({
      appstate:AppStateEnum.Success,
      questions:questions
    })
  }

}

