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
import { TYPES as TYPES_QUIZ } from "src/modules/quiz/interfaces";
import { IValidateCreateQuizService } from "src/modules/quiz/interfaces/services/validate-create.quiz.service.interface";
import { CreateTemplateQuizDto } from "../dto/create-template-quiz.library.dto";
import { ICreateTemplateQuizService } from "../interfaces/services/create-template-quiz.library.service.interface";
import { PublicLibraryDisabledGuard } from "src/modules/quiz/guards/public-library-disabled.guard";

@AuthController("quiz-from-template")
export class CreateTemplateQuizController {
  constructor(
    @Inject(TYPES.services.ICreateTemplateQuizService)
    private createTemplateQuizService: ICreateTemplateQuizService,
    @Inject(TYPES_QUIZ.services.IValidateCreateQuizService)
    private validateQuizService: IValidateCreateQuizService,
  ) { }

  @Post()
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard, PublicLibraryDisabledGuard)
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

    const quizId = await this.createTemplateQuizService.execute(createTemplateQuizDto);

    return { quizId };
  }
}
