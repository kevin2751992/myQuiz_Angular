
// @ts-ignore
import mockup from "./mockupQuestions.json";
import {IQuestion} from "../app/models/questions.model";

export class QuestionService{
    API={
    questionEndpoint:"https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
  }
  /*
  @Fetch Questions from Sample Url
  returns [Questions,Error]
   */
  public async fetchQuestions():Promise<[(IQuestion[]|undefined),any]>{
    console.log("start")
      try{
        let response= await fetch(this.API.questionEndpoint,{
          method: "GET"

        })
        let resultAsJSon= await response.json(); // could be used as Questions -> mapping is required!
        let questions=[...mockup.questions]
        console.log("service",questions)
        return [questions,undefined]

      }catch (e) {
        console.error("Error fetching Questions",e)
        return [undefined,e]

      }


  }
}


