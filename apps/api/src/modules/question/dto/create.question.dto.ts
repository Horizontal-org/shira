export class CreateQuestionDto {
  question: {
    name: string;
    content: string;
    isPhishing: number;
    fieldOfWork?: string;
    apps: string[];
  };
  explanations?: {
    id?: number;
    position: string;
    index: string;
    text: string;
  }[];
}
