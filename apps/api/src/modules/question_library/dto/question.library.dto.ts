import { App } from "./app.dto";
import { Language } from "./language.dto";

export class QuestionLibraryDto {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  language: Language[];
  app: App;
}