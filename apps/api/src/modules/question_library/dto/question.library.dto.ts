import { Explanation } from "./explanation.dto";

export class QuestionLibraryDto {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  content: string;
  language: string;
  appName: string;
  explanations: Explanation[];
}
