import { IsString } from "class-validator";

export class ManageSubscriptionDto {
  @IsString()
  organizationId: string
}
