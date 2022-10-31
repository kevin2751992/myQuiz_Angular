import {State, Action, StateContext, Selector} from '@ngxs/store';
import {IAnswer, IQuestion} from './../models/questions.model'
import {Questions, Stepps} from '../actions/app.actions'
import {Injectable} from "@angular/core";
import {QuestionService} from "../../services/questionService";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {mergeMap} from "rxjs";
import CalculateMaxPoints = Questions.CalculateMaxPoints;
import {isArray} from "@angular/compiler-cli/src/ngtsc/annotations/common";

export enum AppStateEnum {
  Loading,
  Success,
  Error,
  Warning

}

export class AppStateModel {
  questions: IQuestion[] | undefined;
  userPoints: number = 0;
  maxPoints: number = 0;
  steps: FormGroup<{ grpName: FormControl<string | null> }>[] | undefined = [];
  appstate: AppStateEnum = AppStateEnum.Loading;
  username:string|undefined;
  currentStep:number=0;
  maxSteps:number=0

}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    questions: undefined,
    steps: [],
    userPoints: 0,
    maxPoints: 0,
    username:undefined,
    currentStep:0,
    maxSteps:0,
    appstate: AppStateEnum.Loading
  }
})
@Injectable()
export class AppState {
  questionService: QuestionService = new QuestionService();

  constructor() {
  }

  @Selector()
  static getQuestions(state: AppStateModel) {
    return state.questions
  }
  @Selector()
  static getUsername(state: AppStateModel) {
    return state.username
  }

  @Selector()
  static getQuestion(state: AppStateModel, index: number) {
    if (!state.questions || index > state.questions.length) return;
    return state.questions[index]
  }
  @Selector()
  static getCurrentStep(state:AppStateModel) {
    return state.currentStep
  }

  @Selector()
  static getUserPoints(state: AppStateModel) {
    return state.userPoints
  }

  @Selector()
  static getMaxPoints(state: AppStateModel) {
    return state.maxPoints
  }



  @Action(Questions.SetQuestions)
  setQuestions(ctx: StateContext<AppStateModel>, {payload}: Questions.SetQuestions) {
    console.log("test")
    ctx.patchState({
      questions: [...payload]
    })
  }
  @Action(Questions.SetUserName)
  setUserName(ctx: StateContext<AppStateModel>, {payload}: Questions.SetUserName) {
    console.log("payload",payload)
    ctx.patchState({
      username:payload })
  }
  @Action(Stepps.IncrementStep)
  incrementQuestions(ctx: StateContext<AppStateModel>) {
    console.log("increment")
    let step= ctx.getState().currentStep;
    step?step=step:step=0;
    ctx.patchState({
      currentStep:step+1
    })
  }

  @Action(Questions.SetQuestions)
  setQuestion(ctx: StateContext<AppStateModel>, {payload}: Questions.SetQuestion) {

    let currstate = ctx.getState()
    console.log("currstate",currstate)
    let tmpCopy: IQuestion[] = [];
    if (currstate.questions) {
      let tmpCopy = [...currstate.questions];
      tmpCopy[payload.index] = payload.updatedQuestion
    }
    console.log("Update Question", tmpCopy)
    ctx.patchState({
      questions: [...tmpCopy],
    })
  }
  //Fetch Questions from defined Endpoint and Calculates the max possible Points u can get in current quiz
  @Action(Questions.FetchQuestions)
  async fetchQuestions(ctx: StateContext<AppStateModel>) {
    console.log("here")
    let [questions, error] = await this.questionService.fetchQuestions();
    if (error) {
      ctx.patchState({
        appstate: AppStateEnum.Error
      })
      return
    }
    if(questions && questions.length>0){
      ctx.patchState({
        appstate: AppStateEnum.Success,
        questions: questions,
        maxSteps:(questions?.length)-1
      })
    }
    //ctx.dispatch(new CalculateMaxPoints())
  }

  // Calculates the max possible Points for the Quiz
  @Action(Questions.CalculateMaxPoints)
  calcMaxPoints(ctx:StateContext<AppStateModel>){
    console.log("calc maxPoints")
    let maxQuizPoints=0;
    let questions = ctx.getState().questions;
    questions?.forEach(q=>{
      maxQuizPoints=maxQuizPoints+q.maxPoints;
    });
    console.log("maxPoints calculated",maxQuizPoints)
    ctx.patchState({
      maxPoints:maxQuizPoints
    })
  }
  //Calculates UserPoints
  @Action(Questions.CalculateUserPoints)
  calcUserPoints(ctx: StateContext<AppStateModel>) {
    console.log("here3")
    let userPoints: number = 0;
    let questions = ctx.getState().questions;
    questions?.forEach((q: IQuestion) => {
      if(!q.userAnswer) return;
      q.userAnswer.forEach((answer)=>{
        userPoints = userPoints + answer.points!
      })


    })
    ctx.patchState({
      userPoints: userPoints
    })
  }

}

