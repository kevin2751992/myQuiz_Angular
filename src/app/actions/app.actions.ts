import {IAnswer, IQuestion} from "../models/questions.model";

export namespace Questions{

  export class SetQuestions {

    static readonly  type ='[APP] set questions'
    constructor(public payload:IQuestion[]) {}
  }
  export class SetQuestion {
    static readonly  type ='[APP] set question'

    constructor(public payload:{updatedQuestion: IQuestion, index: number}) {
      console.log("action")
    }
  }
  export class FetchQuestions{
    static readonly type = "[API] fetch questions ";
    constructor() {}
  }

  export class CalculateUserPoints{
    static readonly type = "[APP] calculate result ";
    constructor() {}
  }
  export class CalculateMaxPoints{
    static readonly type = "[APP] calculate max Points ";
    constructor() {}
  }
  export class GetResult{
    static readonly type = "[APP] get result ";
    constructor() {}
  }
}


