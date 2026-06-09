import { Body, Inject, Post, UseGuards } from "@nestjs/common";
import { LoggedUser } from "src/modules/auth/decorators";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { TYPES } from "../interfaces";
import { LoggedUserDto } from "src/modules/user/dto/logged.user.dto";
import { SubscriptionGuard } from "src/modules/subscription/guards/subscription.guard";
import { SubscriptionDecorator } from "src/modules/subscription/decorators/subscription.decorator";
import { CachedSubscription } from "src/modules/subscription/dto/cached-response.dto";
import { IValidateCreateQuizService } from "../interfaces/services/validate-create.quiz.service.interface";
import { CreateTemplateQuizDto } from "./create-template.quiz.dto";
import { ICreateTemplateQuizService } from "./create-template.quiz.service.interface";

@AuthController("quiz-from-template")
export class CreateTemplateQuizController {
  constructor(
    @Inject(TYPES.services.ICreateTemplateQuizService)
    private createTemplateQuizService: ICreateTemplateQuizService,
    @Inject(TYPES.services.IValidateCreateQuizService)
    private validateQuizService: IValidateCreateQuizService,
  ) { }

  @Post()
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async create(
    @LoggedUser() user: LoggedUserDto,
    @Body() createTemplateQuizDto: CreateTemplateQuizDto,
    @SubscriptionDecorator() subscription?: CachedSubscription
  ) {
    createTemplateQuizDto.space = user.activeSpace.space;

    await this.validateQuizService.execute(
      subscription,
      createTemplateQuizDto.visibility,
      createTemplateQuizDto.space.id,
    );

    await this.createTemplateQuizService.execute(createTemplateQuizDto);
  }
}
