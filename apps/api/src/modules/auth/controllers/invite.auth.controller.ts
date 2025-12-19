import { Body, UseGuards, Controller, Inject, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guards/roles.guard";
import { TYPES, ISendInvitationAuthService } from "../interfaces";
import { Roles } from "../decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { SendInvitationDto } from "../domain/send-invitation.dto";

@Controller('invitation')
export class InviteAuthController {
    constructor(
        @Inject(TYPES.services.ISendInvitationAuthService)
        private sendInvitationService: ISendInvitationAuthService
    ){}

    @Post()
    async sendInvitation(@Body() invitationDto: SendInvitationDto) {
        await this.sendInvitationService.execute(invitationDto)
        return { success: true, message: 'Invitation sent successfully' }
    }
}