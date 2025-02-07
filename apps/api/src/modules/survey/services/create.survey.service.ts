import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Survey } from '../domain/survey.entity';
import { CreateSurveyDto } from '../dto/create.survey.dto';


@Injectable()
export class CreateSurveyService {

  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepo: Repository<Survey>,    
  ) {}

  async create (newSurvey: CreateSurveyDto) {
    const survey = this.surveyRepo.create(newSurvey)      
    await this.surveyRepo.save(survey)
    
    return true
  }
}