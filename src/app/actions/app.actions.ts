import {IQuestion} from "../models/questions.model";

export namespace Questions{

  export class SetQuestions {

    static readonly  type ='[APP] set questions'
    constructor(public payload:IQuestion[]) {}
  }
  export class SetQuestion {

    static readonly  type ='[APP] set question'
    constructor(public payload: { index:number, updatedQuestion:IQuestion } ) {}
  }
  export class FetchQuestions{
    static readonly type = "[API] fetch questions ";
    constructor() {}
  }
}


