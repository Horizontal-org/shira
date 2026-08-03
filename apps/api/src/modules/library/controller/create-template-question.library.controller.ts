import { Body, Inject, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { SpaceId } from "src/modules/auth/decorators";
import { TYPES as TYPES_QUIZ } from "src/modules/quiz/interfaces";
import { IValidateSpaceQuizService } from "src/modules/quiz/interfaces/services/validate-space.quiz.service.interface";
import { PublicLibraryDisabledGuard } from "src/modules/quiz/guards/public-library-disabled.guard";
import { TYPES } from "../interfaces";
import { CreateTemplateQuestionDto } from "../dto/create-template-question.library.dto";
import { ICreateTemplateQuestionService } from "../interfaces/services/create-template-question.library.service.interface";

@AuthController("question-from-template")
export class CreateTemplateQuestionController {
  constructor(
    @Inject(TYPES.services.ICreateTemplateQuestionService)
    private createTemplateQuestionService: ICreateTemplateQuestionService,
    @Inject(TYPES_QUIZ.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService,
  ) { }

  @Post()
  @Roles(Role.SpaceAdmin)
  @UseGuards(PublicLibraryDisabledGuard)
  async create(
    @Body() createTemplateQuestionDto: CreateTemplateQuestionDto,
    @SpaceId() spaceId: number,
  ) {
    await this.validateSpaceQuizService.execute(spaceId, createTemplateQuestionDto.quizId);

    const questionId = await this.createTemplateQuestionService.execute(createTemplateQuestionDto);

    return { questionId };
  }
}
