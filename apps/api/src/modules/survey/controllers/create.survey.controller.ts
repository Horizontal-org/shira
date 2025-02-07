import { Body, Controller, Get, Inject, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateSurveyDto } from '../dto/create.survey.dto';
import { CreateSurveyService } from '../services/create.survey.service';

@Controller('survey')
export class CreateSurveyController {
  constructor(
    private createSurveyService: CreateSurveyService
  ) {}

  @Post('')
  async handler(@Body() newSurvey: CreateSurveyDto) {
    this.createSurveyService.create(newSurvey)
  }
}
