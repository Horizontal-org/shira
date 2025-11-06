import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { AssignLearnerService } from '../services/assign.learner.service';
import { AssignLearnerDto } from '../dto/assign.learner.dto';

@AuthController('learner')
export class AssignLearnerController {
  constructor(
    @Inject(TYPES.services.IAssignLearnerService)
    private readonly assignLearnerService: AssignLearnerService
  ) { }

  @Post('assign')
  async assign(@Body() assignLearnerDto: AssignLearnerDto) {
    try {
      await this.assignLearnerService.execute(assignLearnerDto);
    } catch (e) {
      console.log("🚀 ~ AssignLearnerController ~ assign ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }

  @Post('assign/bulk')
  async assignBulk() {
    //TODO assign bulk
  }

}