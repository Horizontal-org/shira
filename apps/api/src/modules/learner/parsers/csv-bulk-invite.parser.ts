import { Injectable } from "@nestjs/common";
import { parse } from "csv-parse/sync";
import { IBulkInviteParser } from "../interfaces/parsers/bulk-invite-parser.interface";
import { ApiLogger } from "../logger/api-logger.service";

@Injectable()
export class CsvBulkInviteParser implements IBulkInviteParser {

  private readonly logger = new ApiLogger(CsvBulkInviteParser.name);

  supports(file: Express.Multer.File): boolean {
    const name = file.originalname?.toLowerCase() ?? "";
    return file.mimetype === "text/csv" || name.endsWith(".csv");
  }

  parse(file: Express.Multer.File) {
    this.logger.debug(`Parsing CSV bulk invite file: ${file.originalname}`);

    const content = file.buffer?.toString("utf8") ?? "";

    const rows = parse(content, {
      bom: true,
      skip_empty_lines: true,
      relax_column_count: true,
    }) as string[][];

    if (rows.length <= 1) {
      return { total: 0, valid: [], errors: [], skipped: [] };
    }

    const dataRows = rows.slice(1);
    const valid: Array<{ row: number; name: string; email: string }> = [];
    const errors: Array<{ row: number; name: string; email: string; error: string }> = [];
    const skipped: Array<{ row: number; name: string; email: string; reason: string }> = [];

    dataRows.forEach((row, index) => {
      const [nameRaw = "", emailRaw = ""] = Array.isArray(row) ? row : [];
      const name = nameRaw.trim();
      const email = emailRaw.trim();
      const rowNumber = index + 2;

      if (!email) {
        errors.push({ row: rowNumber, name, email, error: "Missing email address" });
        return;
      }

      if (!this.isValidEmail(email)) {
        errors.push({ row: rowNumber, name, email, error: "Invalid email address" });
        return;
      }

      valid.push({ row: rowNumber, name, email });
    });

    return {
      total: dataRows.length,
      valid,
      errors,
      skipped,
    };
  }

  private isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
