import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleService } from 'nestjs-console';
import * as prompt from 'prompt';
import { Repository } from 'typeorm';

import {
  IGenerateTokenAuthService,
  IValidateAuthService,
  TYPES as AUTH_TYPES,
} from '../../auth/interfaces';
import { Question } from '../domain';

@Injectable()
export class QuestionCommander {
  constructor(
    private readonly consoleService: ConsoleService,
    @Inject(AUTH_TYPES.services.IValidateAuthService)
    private readonly validateAuthService: IValidateAuthService,
    @Inject(AUTH_TYPES.services.IGenerateTokenAuthService)
    private readonly generateTokenAuthService: IGenerateTokenAuthService,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {
    const cli = this.consoleService.getCli();
    const groupCommand = this.consoleService.createGroupCommand(
      {
        command: 'questions',
        description: 'Question commands',
      },
      cli,
    );

    this.consoleService.createCommand(
      {
        command: 'list',
        description: 'List demo questions',
      },
      async () => {
        try {
          await this.publishDemoQuestions();
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      },
      groupCommand,
    );
  }

  private async getAuthToken() {
    const { email, password } = await prompt.get(['email', 'password']);

    if (!email || !password) {
      console.log('Email and password are required');
      return;
    }

    const user = await this.validateAuthService.execute({
      email: email.toString(),
      password: password.toString(),
    });

    const { access_token } = await this.generateTokenAuthService.execute(user);
    console.log(`\nJWT token for ${user.email} generated`);
    return access_token
  }

  private async getDemoQuestions() {
    const questions = await this.questionRepo
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionTranslations', 'qt')
      .leftJoinAndSelect('qt.languageId', 'qtLang')
      .leftJoinAndSelect('question.explanations', 'explanation')
      .leftJoinAndSelect('explanation.explanationTranslations', 'explanationTranslation')
      .leftJoinAndSelect('explanationTranslation.languageId', 'etLang')
      .select([
        'question.id',
        'question.name',
        'question.type',
        'question.createdAt',
        'question.isPhising',
        'qt.id',
        'qt.content',
        'qtLang.id',
        'qtLang.code',
        'qtLang.name',
        'explanation.id',
        'explanation.position',
        'explanation.index',
        'explanationTranslation.id',
        'explanationTranslation.content',
        'etLang.id',
        'etLang.code',
        'etLang.name',
      ])
      .where('question.type = :type', { type: 'demo' })
      .getMany();

    console.log(`Found ${questions.length} questions:`);
    return questions;
  }

  private async prepareQuestionsForPublishing(questions) {
    let readyQuestions = [];
    questions.forEach(q => {
      let questions = []
      q.questionTranslations.forEach(qt => {
        const lang = { name: qt.languageId.name, code: qt.languageId.code }
        const question = {
          name: q.name + ' - ' + lang.name,
          is_phishing: q.isPhising,
          is_demo: true,
          content: qt.content,
          lang: lang,
          explanations: []
        }

        let explanations = []
        q.explanations.forEach(e => {
          const explanation = {
            question_id: q.id,
            position: e.position,
            index: e.index,
            content: e.explanationTranslations.find(et => et.languageId.id === qt.languageId.id),
          }

          explanations.push(explanation)
        })

        question.explanations = explanations
        questions.push(question)
      })

      readyQuestions = [...readyQuestions, ...questions]
    })

    return readyQuestions;
  }

  async publishDemoQuestions() {
    prompt.start();

    //here jwt retrieval

    const demoQuestions = await this.getDemoQuestions()
    const readyQuestions = await this.prepareQuestionsForPublishing(demoQuestions);

    console.log('Ready to publish the following questions:');
    console.log(JSON.stringify(readyQuestions, null, 2));

  }
}
