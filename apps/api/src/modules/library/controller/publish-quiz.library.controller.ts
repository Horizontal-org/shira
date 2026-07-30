import { Inject, ParseIntPipe, Param, Post, Body } from '@nestjs/common'

import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'

import { TYPES } from '../interfaces'
import { IPublishQuizLibraryService } from '../interfaces/services/publish-quiz.library.service.interface'
import { PublishLibraryBodyDto } from '../dto/publish-body.library.dto'
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto'
import { LoggedUser } from 'src/modules/auth/decorators'

@AuthController('library')
export class PublishQuizLibraryController {
  constructor(
    @Inject(TYPES.services.IPublishQuizLibraryService)
    private readonly publishService: IPublishQuizLibraryService,
  ) { }

  @Post('quiz/:quizId/publish')
  @Roles(Role.SpaceAdmin)
  async publish(
    @LoggedUser() user: LoggedUserDto,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() body: PublishLibraryBodyDto,
  ) {
    await this.publishService.execute({
      quizId,
      spaceId: user.activeSpace.space.id,
      templateName: body.templateName,
      templateDescription: body.templateDescription,
      langTagIds: body.langTagIds,
      tagIds: body.tagIds,
      author: {
        publicSpaceId: user.activeSpace.space.publicId,
        spaceName: user.activeSpace.space.name,
        spaceDisplayName: body.spaceDisplayName,
        organizationName: user.activeOrganization.name,
      }
    })
  }
}
