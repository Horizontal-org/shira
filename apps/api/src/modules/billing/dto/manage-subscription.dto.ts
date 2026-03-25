import { IsInt } from "class-validator";

export class ManageSubscriptionDto {
  @IsInt()
  organizationId: number
}
