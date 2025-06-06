import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlanEntity, PlanInterval, PlanName } from "src/modules/billing/domain/plan.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlanSeederService {
    constructor(
        @InjectRepository(PlanEntity)
        private readonly planRepository: Repository<PlanEntity>
    ){}

    async create(): Promise<void> {
        const existingPlans = await this.planRepository.count()
        if(existingPlans > 0) {
            console.log('Plans already exist, skipping seed...');
            return;
        }

        // this is just a starter seed, we'll change this eventually
        await this.planRepository.save([
            {
                name: PlanName.STARTER,
                price: 0.00,
                currency: 'USD',
                interval: PlanInterval.MONTH,
                stripePlanId: null,
            },
            {
                name: PlanName.PROFESSIONAL,
                price: 99.00,
                currency: 'USD',
                interval: PlanInterval.MONTH,
                stripePlanId: null,
            },
            {
                name: PlanName.ENTERPRISE,
                price: 999.00,
                currency: 'USD',
                interval: PlanInterval.MONTH,
                stripePlanId: null,
            },
        ])
        console.log('✅ Plans seeded successfully');
    }
}