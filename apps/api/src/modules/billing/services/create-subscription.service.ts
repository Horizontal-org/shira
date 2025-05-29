import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ICreateSubscriptionService } from "../interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { SubscriptionEntity } from "../domain/subscription.entity";
import { CreateSubscriptionDTO } from "../dto/create-subscription.dto";
import { PlanEntity } from "../domain/plan.entity";
import { OrganizationEntity } from "src/modules/organization/domain/organization.entity";
import { OrganizationSubscriptionsEntity } from "src/modules/organization/domain/organization_subscriptions.entity";
import { Repository } from "typeorm";
@Injectable()
export class CreateSubscriptionService implements ICreateSubscriptionService {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,
        @InjectRepository(PlanEntity)
        private readonly planRepository: Repository<PlanEntity>,
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
        @InjectRepository(OrganizationSubscriptionsEntity)
        private readonly organizationSubscriptionsRepository: Repository<OrganizationSubscriptionsEntity>,
    ){}

    async execute(createSubscriptionDto: CreateSubscriptionDTO): Promise<SubscriptionEntity> {
        const { organizationId, planId, ...subscriptionData } = createSubscriptionDto

        const organization = await this.organizationRepository.findOne({
            where: { id: organizationId }
        })

        if(!organization) {
            throw new NotFoundException(`Org with if ${organizationId} not found}`)
        }

        // before merging change this to name and interval
        const plan = await this.planRepository.findOne({
            where: { id: planId}
        })

        if (!plan) {
            throw new NotFoundException(`Plan with id ${planId} not found`);
        }

        const existingOrgSubscription = await this.organizationSubscriptionsRepository
            .createQueryBuilder('orgSub')
            .innerJoin('orgSub.subscription', 'subscription')
            .where('orgSub.organizationId = :organizationId', { organizationId })
            .andWhere('subscription.status IN (:...activeStatuses)', {
                activeStatuses: ['active', 'trialing']
            })
            .getOne()

        if (existingOrgSubscription) {
            throw new ConflictException(`Organization ${organizationId} already has an active subscription`);
        }

        // create sub
        const subscription = this.subscriptionRepository.create({
            planId,
            status: subscriptionData.status || 'trialing',
            stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
            startDate: subscriptionData.startDate ? new Date(subscriptionData.startDate) : new Date(),
            endDate: subscriptionData.endDate ? new Date(subscriptionData.endDate) : null,
            trialEndDate: subscriptionData.trialEndDate ? new Date(subscriptionData.trialEndDate) : null,
        })

        const savedSubscription = await this.subscriptionRepository.save(subscription);

        //atach sub to org
        const organizationSubscription = this.organizationSubscriptionsRepository.create({
            organizationId,
            subscriptionId: savedSubscription.id
        })

        await this.organizationSubscriptionsRepository.save(organizationSubscription)

        return await this.subscriptionRepository.findOne({
            where: { id: savedSubscription.id },
            relations: ['plan']
        })
    }
}