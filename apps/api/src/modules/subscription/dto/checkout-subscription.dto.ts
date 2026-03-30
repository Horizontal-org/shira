import { IsEnum } from "class-validator";
import { IsNotEmpty } from "src/utils/decorators/is-not-empty.decorator";

export enum CheckoutSubscriptionType {
  STARTER = "starter",
  PRO = "pro",
  ENTERPRISE = "enterprise",
}

export class CheckoutSubscriptionDto {
  @IsEnum(CheckoutSubscriptionType)
  @IsNotEmpty({ message: "selectedSubscriptionType cannot be empty" })
  selectedSubscriptionType: CheckoutSubscriptionType;
}
