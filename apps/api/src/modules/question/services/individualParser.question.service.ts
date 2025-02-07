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
export class ParserQuestionService {
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
  async export({ id, lang, res }) {
    const { id: languageId } = await this.languageRepository.findOne({
      where: { code: lang || 'en' },
    });

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
      .where('question.id = :id', { id })
      .andWhere('questionTranslations.languageId = :languageId', {
        languageId,
      });

    const resData = await query.getOne();

    if (!resData) {
      return res.status(404).send('Question not found');
    }

    const explanations = resData.explanations.map(
      (explanation) =>
        `<div data-explanation-id='${explanation.id}'>${explanation.explanationTranslations[0].content}</div>`,
    );
    const explanationsHtml = `<div id="explanations">\n${explanations.join(
      '\n',
    )}\n</div>\n`;

    const questionTranslationContent = resData.questionTranslations[0].content;

    const fileName = `question_${id}_translation_${lang}.html`;
    const filePath = path.join(__dirname, '..', fileName);
    fs.writeFile(
      filePath,
      questionTranslationContent + explanationsHtml,
      (err) => {
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
      },
    );
  }

  async import({ id, files, res }) {
    for (const file of files) {
      const fileName = file.originalname;
      const langCode = fileName.split('_')[3].split('.')[0];
      const { id: lang } = await this.languageRepository
        .findOneOrFail({
          where: { code: langCode },
        })
        .catch((err) => {
          console.error(err);
          return res.status(404).send('Language not found');
        });
      console.log(lang);
      const filePath = path.join(__dirname, '..', fileName);

      // Save the uploaded file to the server
      fs.writeFileSync(filePath, file.buffer);

      // Read the HTML file contents
      const fileContents = fs.readFileSync(filePath, 'utf-8');

      const $ = cheerio.load(fileContents);
      const explanationContents = [];
      $('#explanations > div').each((i, elem) => {
        const explanationId = $(elem).attr('data-explanation-id');
        const explanationContent = $(elem).html();
        explanationContents.push({
          id: explanationId,
          content: explanationContent,
        });
      });
      $('#explanations').remove();
      const questionTranslationContent = $('body')
        .html()
        .replace(/>\s+</g, '><');
      // find a questionTranslation with id as question is and lang. If does not exist create it
      const questionTranslated =
        await this.QuestionTranslationRepository.findOne({
          where: { question: id, languageId: lang },
        });

      if (!questionTranslated) {
        // create new questionTranslation with new fileContents
        const questionTranslation = new QuestionTranslation();
        questionTranslation.content = questionTranslationContent;
        questionTranslation.languageId = lang;
        questionTranslation.question = id;
        await this.QuestionTranslationRepository.save(questionTranslation);
        for (const explanationContent of explanationContents) {
          const explanationTranslated =
            await this.ExplanationTranslationRepository.findOne({
              where: { explanation: explanationContent.id, languageId: lang },
            });

          if (!explanationTranslated) {
            const explanationTranslation = new ExplanationTranslation();
            explanationTranslation.content = explanationContent.content;
            explanationTranslation.languageId = lang;
            explanationTranslation.explanation = explanationContent.id;
            await this.ExplanationTranslationRepository.save(
              explanationTranslation,
            );
          } else {
            explanationTranslated.content = explanationContent.content;
            await this.ExplanationTranslationRepository.save(
              explanationTranslated,
            );
          }
        }
        fs.unlinkSync(filePath);
        // return { message: 'Question translation imported successfully' };
      } else {
        questionTranslated.content = questionTranslationContent;
        await this.QuestionTranslationRepository.save(questionTranslated);

        for (const explanationContent of explanationContents) {
          const explanationTranslated =
            await this.ExplanationTranslationRepository.findOne({
              where: { explanation: explanationContent.id, languageId: lang },
            });

          if (!explanationTranslated) {
            const explanationTranslation = new ExplanationTranslation();
            explanationTranslation.content = explanationContent.content;
            explanationTranslation.languageId = lang;
            explanationTranslation.explanation = explanationContent.id;
            await this.ExplanationTranslationRepository.save(
              explanationTranslation,
            );
          } else {
            explanationTranslated.content = explanationContent.content;
            await this.ExplanationTranslationRepository.save(
              explanationTranslated,
            );
          }
        }
        fs.unlinkSync(filePath);
      }

      return res.status(200).send('Question translation imported successfully');
    }
  }
}
