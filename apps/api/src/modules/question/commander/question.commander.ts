import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleService } from 'nestjs-console';
import * as fs from 'fs';
import * as path from 'path';
import * as prompt from 'prompt';
import { Repository } from 'typeorm';

import {
  IGenerateTokenAuthService,
  IValidateAuthService,
  TYPES as AUTH_TYPES,
} from '../../auth/interfaces';
import { Question } from '../domain';

interface PublishedEntry {
  questionId: number
  langs: string[]
}

interface DemoPublishState {
  published: PublishedEntry[]
}

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
        command: 'publish',
        description: 'Publish new demo questions',
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

    try {
      const user = await this.validateAuthService.execute({
        email: email.toString(),
        password: password.toString(),
      });

      const { access_token } = await this.generateTokenAuthService.execute(user);
      console.log(`\nJWT token for ${user.email} generated`);
      return access_token
    } catch (e) {
      console.log('Authentication failed:', e.message);
      return
    }
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

    console.log(`Found ${questions.length} demo question(s) in DB`)
    return questions;
  }

  private async prepareQuestionsForPublishing(questions) {
    let readyQuestions = [];
    questions.forEach(q => {
      let questions = []
      q.questionTranslations.forEach(qt => {
        const lang = { name: qt.languageId.name, code: qt.languageId.code }
        const question = {
          questionId: q.id,
          name: q.name,
          is_phishing: q.isPhising,
          is_demo: true,
          content: qt.content,
          lang: lang,
          explanations: []
        }

        let explanations = []
        q.explanations.forEach(e => {
          const et = e.explanationTranslations.find(et => et.languageId.id === qt.languageId.id)
          const explanation = {
            question_id: q.id,
            position: e.position,
            index: e.index,
            content: et ? et.content : '',
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

    const demoQuestions = await this.getDemoQuestions()
    const readyQuestions = await this.prepareQuestionsForPublishing(demoQuestions)

    const totalCombinations = readyQuestions.length
    console.log(`Expanded to ${totalCombinations} question/language combination(s)`)

    const state = this.loadState()
    const trackedCombinations = state.published.reduce((sum, p) => sum + p.langs.length, 0)
    console.log(`State: ${state.published.length} unique question(s) tracked (${trackedCombinations} combination(s))`)

    const toPublish = this.filterUnpublished(readyQuestions, state)
    const skipped = totalCombinations - toPublish.length
    if (skipped > 0) {
      console.log(`Skipped ${skipped} already-published combination(s)`)
    }

    if (toPublish.length === 0) {
      console.log('All demo questions are already published')
      return
    }

    console.log(`\n${toPublish.length} question(s) to publish:`)
    for (const q of toPublish) {
      console.log(`  - "${q.name}" (id: ${q.questionId}, lang: ${q.lang.code})`)
    }

    const { confirm } = await prompt.get(['confirm'])
    if (confirm.toString().toLowerCase() !== 'yes' && confirm.toString().toLowerCase() !== 'y') {
      console.log('Aborted.')
      return
    }

    const token = await this.getAuthToken()
    if (!token) return

    console.log(`Uploading ${toPublish.length} combination(s)...`)
    await this.postQuestions(toPublish, token)
    console.log('Upload complete')

    this.saveState(state, toPublish)
    console.log(`State saved: now tracking ${state.published.length} question(s) with multiple languages`)
  }

  private async postQuestions(questions: any[], token: string) {
    const baseUrl = process.env.SHIRA_LIBRARY_URL
    if (!baseUrl) {
      throw new Error('SHIRA_LIBRARY_URL env var is not set')
    }

    const res = await fetch(`${baseUrl}/questions/demo/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(questions),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Batch post failed: ${res.status} ${body}`)
    }
  }

  // -- Demo publish state --

  private get statePath() {
    return path.join(process.cwd(), 'demo-publish-state.json')
  }

  private loadState(): DemoPublishState {
    try {
      const raw = fs.readFileSync(this.statePath, 'utf8')
      return JSON.parse(raw)
    } catch {
      return { published: [] }
    }
  }

  private saveState(state: DemoPublishState, newlyPublished: any[]) {
    for (const q of newlyPublished) {
      const existing = state.published.find(p => p.questionId === q.questionId)
      if (existing) {
        if (!existing.langs.includes(q.lang.code)) {
          existing.langs.push(q.lang.code)
        }
      } else {
        state.published.push({ questionId: q.questionId, langs: [q.lang.code] })
      }
    }
    fs.writeFileSync(this.statePath, JSON.stringify(state, null, 2))
  }

  private filterUnpublished(readyQuestions: any[], state: DemoPublishState) {
    return readyQuestions.filter(q => {
      const existing = state.published.find(p => p.questionId === q.questionId)
      if (!existing) return true
      return !existing.langs.includes(q.lang.code)
    })
  }
}
