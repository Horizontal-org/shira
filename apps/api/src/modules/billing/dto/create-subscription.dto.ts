import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum, IsDateString } from "class-validator";
import { SubscriptionStatus } from "../domain/subscription.entity";

export class CreateSubscriptionDTO {
    @IsNumber()
    @IsNotEmpty()
    organizationId: number

    @IsNumber()
    @IsNotEmpty()
    planId: number

    @IsOptional()
    @IsString()
    stripeSubscriptionId?: string

    @IsOptional()
    @IsEnum(SubscriptionStatus)
    status?: SubscriptionStatus

    @IsOptional()
    @IsDateString()
    startDate?: string

    @IsOptional()
    @IsDateString()
    endDate?: string

    @IsOptional()
    @IsDateString()
    trialEndDate?: string
}