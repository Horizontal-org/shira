import { SendInvitationDto } from "../../domain/send-invitation.dto";

export interface ISendInvitationAuthService {
    execute(invitationData: SendInvitationDto): Promise<void>
}