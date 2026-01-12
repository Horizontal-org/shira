import { Injectable } from "@nestjs/common";
import { IBulkInviteParser } from "../interfaces/parsers/bulk-invite-parser.interface";

@Injectable()
export class CsvBulkInviteParser implements IBulkInviteParser {
  supports(file: Express.Multer.File): boolean {
    const name = file.originalname?.toLowerCase() ?? "";
    return file.mimetype === "text/csv" || name.endsWith(".csv");
  }

  parse(file: Express.Multer.File) {
    const content = file.buffer?.toString("utf8").replace(/^\uFEFF/, "") ?? "";
    const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);

    if (lines.length <= 1) {
      return { total: 0, valid: [], errors: [], skipped: [] };
    }

    const rows = lines.slice(1);
    const valid: Array<{ row: number; name: string; email: string }> = [];
    const errors: Array<{ row: number; name: string; email: string; error: string }> = [];
    const skipped: Array<{ row: number; name: string; email: string; reason: string }> = [];

    rows.forEach((line, index) => {
      const [nameRaw = "", emailRaw = ""] = this.parseCsvRow(line);
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
      total: rows.length,
      valid,
      errors,
      skipped,
    };
  }

  private parseCsvRow(line: string): string[] {
    const values: string[] = [];
    let current = "";
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

      if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
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
