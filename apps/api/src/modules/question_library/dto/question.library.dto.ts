import { Explanation } from "./explanation.dto";
import { App } from "./app.dto";

export class QuestionLibraryDto {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  content: string;
  language: string;
  app: App;
  explanations: Explanation[];
}
