import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { IDeleteLearnerService } from "../interfaces/services/delete.learner.service.interface";
import { DeleteLearnerDto } from "../dto/delete.learner.dto";
import { ApiLogger } from "../logger/api-logger.service";

@Injectable()
export class DeleteLearnerService implements IDeleteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private learnerRepo: Repository<LearnerEntity>,
  ) { }

  private logger = new ApiLogger(DeleteLearnerService.name);

  async delete(deleteLearnerDto: DeleteLearnerDto, spaceId: number): Promise<void> {
    const amountOfIds = deleteLearnerDto.ids;

    this.logger.log(`Deleting learners with IDs: ${amountOfIds.join(', ')} from spaceId: ${spaceId}`);

    const [learnersToDelete, toDeleteCount] = await this.learnerRepo.findAndCount({
      where: {
        id: In(amountOfIds),
        space: { id: spaceId }
      }
    })

    if (toDeleteCount !== amountOfIds.length) {
      throw new ForbiddenException()
    }

    await this.learnerRepo.remove(learnersToDelete);

    this.logger.log(`Successfully deleted learners
      with IDs: ${amountOfIds.join(', ')}
      from spaceId: ${spaceId}`);
  }
}
