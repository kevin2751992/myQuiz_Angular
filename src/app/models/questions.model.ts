export interface IQuestion {
  type:QuestionTypeEnum;
  title:string;
  question:string;
  hint?:string;
  label?:string;
  selectionMode:SelectionModeEnum;
  correctIndex?:number;
  answers?:IAnswer[];
  maxPoints:number;
  userAnswer: IAnswer[];
}
export enum QuestionTypeEnum{
  MULTIPLE_CHECKBOX_CHOICE="MULTIPLE_CHECKBOX_CHOICE",
  SINGLE_RADIO_SELECTION="SINGLE_RADIO_SELECTION",
  TEXTFIELD="TEXTFIELD",
  DROPDOWN="DROPDOWN"
}
export interface IAnswer{
  value:string;
  points:number;
}
export enum SelectionModeEnum{
  SINGLE="SINGLE",
  MULTI="MULTI"
}
