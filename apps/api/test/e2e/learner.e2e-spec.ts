import { INestApplication, Controller, Post, Body, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { InviteLearnerService } from '../../src/modules/learner/services/invite.learner.service';
import { TYPES as LearnerTYPES } from '../../src/modules/learner/interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Learner as LearnerEntity } from '../../src/modules/learner/domain/learner.entity';
import { SpaceEntity } from '../../src/modules/space/domain/space.entity';

@Controller('learner')
class TestLearnerController {
  constructor(
    @Inject(LearnerTYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: any,
    @Inject(LearnerTYPES.services.IAssignLearnerService)
    private readonly assignLearnerService: any,
  ) { }

  @Post('invite')
  async invite(@Body() dto: any) {
    try {
      await this.inviteLearnerService.execute(dto);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  @Post('assign')
  async assign(@Body() dto: any) {
    try {
      await this.assignLearnerService.execute(dto);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }
}

describe('Learner HTTP (e2e)', () => {
  let app: INestApplication;
  let learnerRepo: any;
  let spaceRepo: any;
  let assignServiceMock: { execute: jest.Mock };

  beforeEach(async () => {
    learnerRepo = { save: jest.fn(), create: jest.fn(), findOne: jest.fn() };
    spaceRepo = { findOne: jest.fn() };

    assignServiceMock = { execute: jest.fn() } as any;

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TestLearnerController],
      providers: [
        InviteLearnerService,
        { provide: LearnerTYPES.services.IInviteLearnerService, useExisting: InviteLearnerService },
        { provide: LearnerTYPES.services.IAssignLearnerService, useValue: assignServiceMock },
        { provide: getRepositoryToken(LearnerEntity), useValue: learnerRepo },
        { provide: getRepositoryToken(SpaceEntity), useValue: spaceRepo },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

  });

  afterEach(async () => {
    await app?.close();
    jest.clearAllMocks();
  });

  it('POST /learner/invite creates a learner when space exists', async () => {
    const dto = { email: 'mike@example.com', name: 'Mike', spaceId: 77 };

    spaceRepo.findOne.mockResolvedValue({ id: dto.spaceId } as any);

    const saved = { id: 11, email: dto.email, name: dto.name, space: { id: dto.spaceId } };
    learnerRepo.save.mockResolvedValue(saved);

    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .post('/learner/invite')
      .send(dto)
      .expect(201);

    expect(spaceRepo.findOne).toHaveBeenCalledWith({ where: { id: dto.spaceId } });
    expect(learnerRepo.save).toHaveBeenCalledTimes(1);

    const saveArg = learnerRepo.save.mock.calls[0][0];
    expect(saveArg).toEqual(expect.objectContaining({ email: dto.email, name: dto.name }));
    expect(res.body).toEqual(expect.any(Object));
  });

  it('POST /learner/invite returns 422 when service fails', async () => {
    const dto = { email: 'bob@example.com', name: 'Bob', spaceId: 88 };

    spaceRepo.findOne.mockRejectedValue(new Error('db error'));

    const http = app.getHttpAdapter().getInstance();
    await request(http).post('/learner/invite').send(dto).expect(422);
  });

  it('POST /learner/assign calls assign service', async () => {
    const dto = { learnerId: 5, someAssignment: 'x' };
    assignServiceMock.execute.mockResolvedValue(undefined);

    const http = app.getHttpAdapter().getInstance();
    await request(http).post('/learner/assign').send(dto).expect(201);

    expect(assignServiceMock.execute).toHaveBeenCalledWith(dto);
  });

  it('POST /learner/assign returns 422 when assign service throws', async () => {
    const dto = { learnerId: 6, someAssignment: 'y' };
    assignServiceMock.execute.mockRejectedValue(new Error('fail'));

    const http = app.getHttpAdapter().getInstance();
    await request(http).post('/learner/assign').send(dto).expect(422);
  });
});
