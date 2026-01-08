import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrganizationEntity } from '../domain/organization.entity';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';

@Injectable()
export class DeleteOrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
  ) {}
      
  private readonly logger = new ApiLogger(DeleteOrganizationService.name);
  
  async execute(id: number): Promise<void> {
    
    const existing = await this.organizationRepo.find({ where: { id }});
    console.log("🚀 ~ DeleteOrganizationService ~ execute ~ existing:", existing)
    if (!existing) {
      throw new NotFoundException(`Organization with id "${id}" not found`);
    }
    

    try {
      const spaces = await this.spaceRepo.find({ where: { organizationId: id }})
      console.log("🚀 ~ DeleteOrganizationService ~ execute ~ spaces:", spaces)
      await this.spaceRepo.remove(spaces)
      await this.organizationRepo.remove(existing);
    } catch (err) {        
      this.logger.error(err)
      throw new InternalServerErrorException('Failed to delete organization');
    }
  }
}