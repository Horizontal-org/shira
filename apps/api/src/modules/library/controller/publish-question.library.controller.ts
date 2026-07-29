import { Inject, ParseIntPipe, Param, Post, Body } from '@nestjs/common'

import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'

import { TYPES } from '../interfaces'
import { IPublishQuestionLibraryService } from '../interfaces/services/publish-question.library.service.interface'
import { PublishLibraryBodyDto } from '../dto/publish-body.library.dto'
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto'
import { LoggedUser } from 'src/modules/auth/decorators'

@AuthController('library')
export class PublishQuestionLibraryController {
  constructor(
    @Inject(TYPES.services.IPublishQuestionLibraryService)
    private readonly publishService: IPublishQuestionLibraryService,
  ) { }

  @Post('question/:questionId/publish')
  @Roles(Role.SpaceAdmin)
  async publish(
    @LoggedUser() user: LoggedUserDto,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() body: PublishLibraryBodyDto,
  ) {
    await this.publishService.execute({
      questionId,
      spaceId: user.activeSpace.space.id,
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
