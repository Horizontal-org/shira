import { Get, Inject, Param } from '@nestjs/common'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'
import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { TYPES } from '../interfaces'
import { IGetNoteService } from '../interfaces/services/get.note.service.interface'
import { SpaceId } from 'src/modules/auth/decorators'

@AuthController('note')
export class GetNoteController {
  constructor(
    @Inject(TYPES.services.IGetNoteService)
    private getNoteService: IGetNoteService,
  ) {}

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Param('id') id: string,
    @SpaceId() spaceId: number
  ) {
    return this.getNoteService.execute(spaceId, Number(id))
  }
}
