import { IsArray, IsObject } from "class-validator";

export class CreateQuestionDto {
  @IsObject()
  question: {
    name: string;
    content: string;
    isPhishing: boolean;
    fieldOfWork?: string;
    apps: string[];
  };
  @IsArray()
  explanations?: {
    id?: number;
    position: string;
    index: string;
    text: string;
  }[];
}
