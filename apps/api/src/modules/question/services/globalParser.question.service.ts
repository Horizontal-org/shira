import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

@Injectable()
export class GlobalParserQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuestionTranslation)
    private readonly QuestionTranslationRepository: Repository<QuestionTranslation>,
    @InjectRepository(ExplanationTranslation)
    private readonly ExplanationTranslationRepository: Repository<ExplanationTranslation>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}
  // createOrUpdateQuestion
  async export({ lang, res }) {
    console.log(lang);
    const { id: languageId } = await this.languageRepository.findOne({
      where: { code: lang || 'en' },
    });

    //get all questions with explanations and translations in the given language
    const query = this.questionRepository
      .createQueryBuilder('question')
      .leftJoin('question.explanations', 'explanations')
      .leftJoin('question.questionTranslations', 'questionTranslations')
      .leftJoin(
        'explanations.explanationTranslations',
        'explanationTranslations',
        'explanations.id = explanationTranslations.explanation_id AND explanationTranslations.language_id = :languageId',
        { languageId },
      )
      .select([
        'question.id',
        'question.name',
        'explanations.id',
        'questionTranslations.content',
        'explanationTranslations.content',
      ])
      .where('questionTranslations.languageId = :languageId', {
        languageId,
      });

    const resData = await query.getMany();

    if (!resData) {
      return res.status(404).send('Question not found');
    }

    const $ = cheerio.load(`<div id='questions'></div>`);

    const questionDivs = resData.map((question) => {
      const questionDiv = $(`<div data-question-id='${question.id}'></div>`);
      const questionContent = $(
        `<div>${question.questionTranslations[0].content}</div>`,
      );
      const explanationsDiv = $(`<div id='explanations'></div>`);
      if (question.explanations.length > 0) {
        question.explanations.forEach((explanation) => {
          const explanationDiv = $(
            `<div data-explanation-id='${explanation.id}'></div>`,
          );
          const explanationContent = $(
            `<div>${explanation.explanationTranslations[0].content}</div>`,
          );
          explanationDiv.append(explanationContent);
          explanationsDiv.append(explanationDiv);
        });
      }
      questionDiv.append(questionContent);
      if (question.explanations.length > 0) {
        questionDiv.append(explanationsDiv);
      }
      return questionDiv;
    });

    const basicElems = questionDivs.map((div) => div.get(0));
    $('div').append(basicElems);
    const html = $('body').html();

    const fileName = `questions_global_translations_${lang}.html`;
    const filePath = path.join(__dirname, '..', fileName);

    fs.writeFile(filePath, html, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send('Failed to export question translation content');
      } else {
        console.log(`Question translation content exported to ${filePath}`);
        return res.download(filePath, (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .send('Failed to download question translation content');
          }
          // delete the file after downloading
          fs.unlinkSync(filePath);
        });
      }
    });
  }

  async import({ files, res }) {
    for (const file of files) {
      const fileName = file.originalname;
      const langCode = fileName.split('_')[3].split('.')[0];
      console.log(langCode);
      const { id: languageId } = await this.languageRepository.findOne({
        where: { code: langCode },
      });

      const filePath = path.join(__dirname, '..', fileName);
      fs.writeFileSync(filePath, file.buffer);

      const fileContents = fs.readFileSync(filePath, 'utf8');

      const $ = cheerio.load(fileContents);

      const questions = $('div[data-question-id]');
      for (const question of questions) {
        const questionId = $(question).attr('data-question-id');
        const questionContent = $(question)
          .find('div')
          .html()
          .replace(/>\s+</g, '><');
        console.log(questionContent);
        const explanations = $(question).find('div#explanations > div');
        // console.log('explanations', explanations);
        const questionTranslated =
          await this.QuestionTranslationRepository.findOne({
            where: { questionId: parseInt(questionId), languageId },
          });

        if (!questionTranslated) {
          const questionTranslation = new QuestionTranslation();
          questionTranslation.content = questionContent;
          questionTranslation.languageId = languageId;
          questionTranslation.question = questionId as any;
          await this.QuestionTranslationRepository.save(questionTranslation);
          console.log(`question ${questionId} created`);

          //loop through explanations and create explanation translations
          for (const explanation of explanations) {
            const explanationId = $(explanation).attr('data-explanation-id');
            const explanationContent = $(explanation).find('div').text();
            const explanationTranslated =
              await this.ExplanationTranslationRepository.findOne({
                where: { explanationId: parseInt(explanationId), languageId },
              });
            if (!explanationTranslated) {
              const explanationTranslation = new ExplanationTranslation();
              explanationTranslation.content = explanationContent;
              explanationTranslation.languageId = languageId;
              explanationTranslation.explanation = explanationId as any;
              await this.ExplanationTranslationRepository.save(
                explanationTranslation,
              );
              console.log(`explanation ${explanationId} created`);
            } else {
              explanationTranslated.content = explanationContent;
              await this.ExplanationTranslationRepository.save(
                explanationTranslated,
              );
              console.log(`explanation ${explanationId} updated`);
            }
          }
        } else {
          questionTranslated.content = questionContent;
          await this.QuestionTranslationRepository.save(questionTranslated);
          console.log(`question ${questionId} updated`);
          for (const explanation of explanations) {
            const explanationId = $(explanation).attr('data-explanation-id');
            const explanationContent = $(explanation).find('div').text();
            const explanationTranslated =
              await this.ExplanationTranslationRepository.findOne({
                where: { explanationId: parseInt(explanationId), languageId },
              });
            if (!explanationTranslated) {
              const explanationTranslation = new ExplanationTranslation();
              explanationTranslation.content = explanationContent;
              explanationTranslation.languageId = languageId;
              explanationTranslation.explanation = explanationId as any;
              await this.ExplanationTranslationRepository.save(
                explanationTranslation,
              );
              console.log(`explanation ${explanationId} created`);
            } else {
              explanationTranslated.content = explanationContent;
              await this.ExplanationTranslationRepository.save(
                explanationTranslated,
              );
              console.log(`explanation ${explanationId} updated`);
            }
          }
        }
      }
    }

    return res.status(200).send('ok');
  }
}
