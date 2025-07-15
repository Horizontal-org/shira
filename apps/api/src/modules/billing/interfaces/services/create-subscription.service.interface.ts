import { SubscriptionEntity } from "../../domain/subscription.entity";
import { CreateSubscriptionDTO } from "../../dto/create-subscription.dto";

export interface ICreateSubscriptionService {
    execute(createSubscriptionDto: CreateSubscriptionDTO): Promise<SubscriptionEntity>
}