import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  async execute(assignLearnerDto: AssignLearnerDto): Promise<void> {
    // TODO implementation
  }
}