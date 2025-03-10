import { CreateQuestionController } from './create.question.controller';
import { ListQuestionController } from './list.question.controller';
import { DeleteQuestionController } from './delete.question.controller';
import { DemoQuestionController } from './demo.question.controller';
import { EditQuestionController } from './edit.question.controller';
import { ParserQuestionController } from './parser.question.controller';
import { TranslationsQuestionController } from './translations.question.controller';
import { ExportQuestionController } from './export.question.controller';

export const questionControllers = [
  DemoQuestionController,
  CreateQuestionController,
  ListQuestionController,
  DeleteQuestionController,
  EditQuestionController,
  ParserQuestionController,
  TranslationsQuestionController,
  ExportQuestionController
];
