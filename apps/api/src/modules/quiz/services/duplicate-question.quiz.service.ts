import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';

import { IDuplicateQuestionQuizService } from '../interfaces/services/duplicate-question.quiz.service.interface';
import { DuplicateQuestionQuizDto } from '../dto/duplicate-question.quiz.dto';
import { Explanation, Question } from 'src/modules/question/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import { App } from 'src/modules/app/domain';
import { QuestionImage } from 'src/modules/question_image/domain/question_images.entity';


@Injectable()
export class DuplicateQuestionQuizService implements IDuplicateQuestionQuizService{

  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,    
    @InjectRepository(App)
    private readonly appRepo: Repository<App>,
    @InjectRepository(Explanation)
    private readonly explanationRepo: Repository<Explanation>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepo: Repository<QuestionTranslation>,
    @InjectRepository(ExplanationTranslation)
    private readonly explanationTranslationRepo: Repository<ExplanationTranslation>,
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
    @InjectRepository(QuestionImage)
    private readonly questionImageRepo: Repository<QuestionImage>
  ) {}

  async execute (duplicateQuestionDto: DuplicateQuestionQuizDto) {
    console.log("🚀 ~ DuplicateQuestionQuizService ~ execute ~ duplicateQuestionDto:", duplicateQuestionDto)
    
    const originalQuestion = await this.questionRepo.findOne({
      where: { id: duplicateQuestionDto.questionId },
      relations: [
        'apps', 
        'explanations', 
        'questionTranslations', 
        'images',
        'explanations.explanationTranslations'
      ],
    });

    if (!originalQuestion) {
      throw new Error('Question not found');
    }

    console.log("🚀 ~ originalQuestion.languageId:", originalQuestion.languageId);

    // Get default language if original doesn't have one
    const language = originalQuestion.languageId 
      ? await this.languageRepo.findOne({ where: { id: originalQuestion.languageId } })
      : await this.languageRepo.findOne({ where: { code: 'en' } });

    if (!language) {
      throw new Error('Language not found');
    }

    const newQuestion = new Question();
    newQuestion.name = `Copy ${originalQuestion.name}`;
    newQuestion.content = originalQuestion.content;
    newQuestion.isPhising = originalQuestion.isPhising;
    newQuestion.languageId = language.id;
    newQuestion.type = originalQuestion.type;
    newQuestion.apps = originalQuestion.apps;

    const savedQuestion = await this.questionRepo.save(newQuestion);

    for (const translation of originalQuestion.questionTranslations) {
      const newTranslation = new QuestionTranslation();
      newTranslation.content = translation.content;
      newTranslation.question = savedQuestion;
      newTranslation.languageId = translation.languageId || language.id;
      await this.questionTranslationRepo.save(newTranslation);
    }

    for (const explanation of originalQuestion.explanations) {
      const newExplanation = new Explanation();
      newExplanation.position = explanation.position;
      newExplanation.index = explanation.index;
      newExplanation.text = explanation.text;
      newExplanation.question = savedQuestion;
      
      const savedExplanation = await this.explanationRepo.save(newExplanation);
      
      for (const explanationTranslation of explanation.explanationTranslations) {
        const newExplanationTranslation = new ExplanationTranslation();
        newExplanationTranslation.content = explanationTranslation.content;
        newExplanationTranslation.explanation = savedExplanation;
        newExplanationTranslation.languageId = explanationTranslation.languageId || language.id;
        await this.explanationTranslationRepo.save(newExplanationTranslation);
      }
    }

    // Duplicate question images (create new copies) - similar to quiz duplication
    for (const originalImage of originalQuestion.images) {
      const newImage = new QuestionImage();
      newImage.name = originalImage.name;
      newImage.relativePath = originalImage.relativePath;
      newImage.question = savedQuestion;
      newImage.quizId = duplicateQuestionDto.quizId;
      
      await this.questionImageRepo.save(newImage);
    }

    const position = await this.quizQuestionRepo
      .count({ where: { quizId: duplicateQuestionDto.quizId } });

    const quizQuestion = this.quizQuestionRepo.create({
      position: position + 1,
      quizId: duplicateQuestionDto.quizId,
      questionId: savedQuestion.id
    });
    await this.quizQuestionRepo.save(quizQuestion);
  }

}