import { App } from "../../fetch/question_library";
import type { Explanation } from "../../fetch/question_library";

export interface ActiveLibraryQuestion {
  id: number;
  content: string;
  name: string;
  app: App;
  type: string;
  language?: string;
  isPhishing: boolean;
  explanations: Explanation[];
}
