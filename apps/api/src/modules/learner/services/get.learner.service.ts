import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { Repository } from "typeorm";
import { IGetLearnerService } from "../interfaces/services/get.learner.service.interface";
import { plainToInstance } from "class-transformer";
import { GetLearnersDto } from "../dto/get-learner.dto";
import { GenericErrorException } from "../exceptions";

@Injectable()
export class GetLearnerService implements IGetLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  async execute(spaceId:number) {
    let learners = []
    try {
      learners = await this.learnerRepo.find({
        where: {
          spaceId: spaceId
        }
      })
    } catch {
      throw new GenericErrorException()
    }

    return await plainToInstance(GetLearnersDto, learners)
  }
}