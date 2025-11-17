import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { Repository } from "typeorm";
import { IGetLearnerService } from "../interfaces/services/get.learner.service.interface";

@Injectable()
export class GetLearnerService implements IGetLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  async execute() {
    // TODO implementation
  }
}