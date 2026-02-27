import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { IndexController } from '../../src/index.controller';
import { IndexService } from '../../src/index.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [IndexController],
      providers: [IndexService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const http = app.getHttpAdapter().getInstance();
    return request(http)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
