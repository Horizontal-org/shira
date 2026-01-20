export interface BulkInviteParsedResult {
  total: number;
  valid: Array<{ row: number; name: string; email: string }>;
  errors: Array<{ row: number; name: string; email: string; error: string }>;
  skipped: Array<{ row: number; name: string; email: string; reason: string }>;
}

export interface IBulkInviteParser {
  supports(file: Express.Multer.File): boolean;
  parse(file: Express.Multer.File): BulkInviteParsedResult;
}
