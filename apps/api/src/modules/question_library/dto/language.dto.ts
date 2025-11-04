import { Explanation } from "./explanation.dto";

export class Language {
  id: number;
  name: string;
  content: string;
  explanations: Explanation[];
}