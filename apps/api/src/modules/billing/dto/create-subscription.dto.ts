import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum, IsDateString } from "class-validator";

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
    @IsEnum(['active', 'trialing', 'canceled', 'past_due', 'paused'])
    status?: 'active' | 'trialing' | 'canceled' | 'past_due' | 'paused'

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