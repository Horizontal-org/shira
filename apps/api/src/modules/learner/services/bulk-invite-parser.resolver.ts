import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../interfaces";
import { IBulkInviteParser, BulkInviteParsedResult } from "../interfaces/parsers/bulk-invite-parser.interface";
import { IBulkInviteParserResolver } from "../interfaces/parsers/bulk-invite-parser-resolver.interface";

@Injectable()
export class BulkInviteParserResolver implements IBulkInviteParserResolver {
  constructor(
    @Inject(TYPES.parsers.IBulkInviteParsers)
    private readonly parsers: IBulkInviteParser[]
  ) { }

  parse(file: Express.Multer.File): BulkInviteParsedResult {
    const parser = this.parsers.find((entry) => entry.supports(file));
    return parser ? parser.parse(file) : (() => {
      throw new BadRequestException("No parser available for the provided file type");
    })();
  }
}
