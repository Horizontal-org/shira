import { IsInt, IsString } from "class-validator";

export class CreateCheckoutDto {
  @IsString()
  organizationId: string
}
