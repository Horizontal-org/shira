import { InjectRepository } from "@nestjs/typeorm";
import { ISendInvitationAuthService } from "../interfaces";
import { PassphraseEntity } from "src/modules/passphrase/domain/passphrase.entity";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { Injectable } from "@nestjs/common";
import { SendInvitationDto } from "../domain/send-invitation.dto";

@Injectable()
export class SendInvitationAuthService implements ISendInvitationAuthService {
    constructor(
        @InjectRepository(PassphraseEntity)
        private readonly passphraseRepo: Repository<PassphraseEntity>,
        @InjectQueue('emails')
        private emailsQueue: Queue
    ) {}

    async execute(invitationData: SendInvitationDto): Promise<void> {
        
    }
}