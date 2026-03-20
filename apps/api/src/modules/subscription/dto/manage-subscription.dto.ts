import { IsInt, IsString } from 'class-validator';

export class ManageSubscriptionDto {
  @IsInt()
  organizationId: number;

  @IsString()
  subscriptionId: string;
}
