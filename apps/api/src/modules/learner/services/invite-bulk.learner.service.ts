import { Injectable } from "@nestjs/common";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { InvitationEmailSendFailedException } from "../exceptions/invitation-email-send.learner.exception";
import { LearnerOperationResponse } from "../dto/learner-operation-response.dto";
import { IInviteBulkLearnerService } from "../interfaces/services/invite-bulk.learner.service.interface";
import { InviteLearnerService } from "./invite.learner.service";

@Injectable()
export class InviteBulkLearnerService implements IInviteBulkLearnerService {
  constructor(
    private readonly inviteLearnerService: InviteLearnerService
  ) { }

  async invite(
    file: Express.Multer.File,
    spaceId: number
  ): Promise<LearnerOperationResponse[]> {
    const parsed = this.parseCsv(file);

    const results = await Promise.all(
      parsed.valid.map(async ({ row, email, name }): Promise<LearnerOperationResponse> => {
        try {
          await this.inviteLearnerService.invite({ email, name }, spaceId);
          return this.createResponse(row, email, "OK");
        } catch (err) {
          let message = "Unknown invitation error";

          if (err instanceof ConflictLearnerException) {
            message = "The learner is already registered in this space.";
          } else if (err instanceof SaveLearnerException) {
            message = "Failed to save learner.";
          } else if (err instanceof InvitationEmailSendFailedException) {
            message = "Failed to send invitation email.";
          }

          return this.createResponse(row, email, "Error", message);
        }
      })
    );

    return results;
  }

  private parseCsv(file: Express.Multer.File) {
    const content = file.buffer?.toString('utf8').replace(/^\uFEFF/, '') ?? '';
    const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);

    if (lines.length <= 1) {
      return { total: 0, valid: [], errors: [], skipped: [] };
    }

    const rows = lines.slice(1);
    const valid: Array<{ row: number; name: string; email: string }> = [];
    const errors: Array<{ row: number; name: string; email: string; error: string }> = [];
    const skipped: Array<{ row: number; name: string; email: string; reason: string }> = [];

    rows.forEach((line, index) => {
      const [nameRaw = '', emailRaw = ''] = this.parseCsvRow(line);
      const name = nameRaw.trim();
      const email = emailRaw.trim();
      const rowNumber = index + 2;

      if (!email) {
        errors.push({ row: rowNumber, name, email, error: 'Missing email address' });
        return;
      }

      if (!this.isValidEmail(email)) {
        errors.push({ row: rowNumber, name, email, error: 'Invalid email address' });
        return;
      }

      valid.push({ row: rowNumber, name, email });
    });

    return {
      total: rows.length,
      valid,
      errors,
      skipped,
    };
  }

  private createResponse(
    quizId: number,
    email: string,
    status: "OK" | "Error",
    message?: string
  ): LearnerOperationResponse {
    return {
      quizId,
      email,
      status,
      ...(message ? { message } : {}),
    };
  }

  private parseCsvRow(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"' && next === '"') {
        current += '"';
        i += 1;
        continue;
      }

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
        continue;
      }

      current += char;
    }

    values.push(current);
    return values;
  }

  private isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
