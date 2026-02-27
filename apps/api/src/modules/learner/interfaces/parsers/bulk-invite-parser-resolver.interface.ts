import { BulkInviteParsedResult } from "./bulk-invite-parser.interface";

export interface IBulkInviteParserResolver {
  parse(file: Express.Multer.File): BulkInviteParsedResult | null;
}
