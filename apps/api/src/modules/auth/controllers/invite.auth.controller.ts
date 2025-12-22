import { Body, Controller, Inject, Post } from "@nestjs/common";
import { TYPES, ISendInvitationAuthService } from "../interfaces";
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