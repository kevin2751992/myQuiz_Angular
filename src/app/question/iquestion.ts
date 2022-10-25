export interface IQuestion {
  type:QuestionTypeEnum;
  title:string;
  question:string;
  selectionMode:SelectionModeEnum;
  correctIndex?:number;
  answers?:IAnswer[];
  userAnswer?:IAnswer;
}
export enum QuestionTypeEnum{
  MULTIPLE_CHOICE="MULTIPLE_CHOICE",
  TEXTFIELD="TEXTFIELD",
  DROPDOWN="DROPDOWN"
}
export interface IAnswer{
  value:string;
  points?:number;
}
export enum SelectionModeEnum{
  SINGLE="SINGLE",
  MULTI="MULTI"
}
