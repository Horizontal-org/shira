import { BadRequestException, Injectable } from "@nestjs/common";
import { parse } from "csv-parse/sync";
import { IBulkInviteParser } from "../interfaces/parsers/bulk-invite-parser.interface";
import { ApiLogger } from "../logger/api-logger.service";

@Injectable()
export class CsvBulkInviteParser implements IBulkInviteParser {
  private static readonly HEADER = ["name", "email"];
  private static readonly EMAIL_REGEX = /^[^\s@]+@([A-Za-z0-9_-]+\.)+[A-Za-z0-9_-]{2,}$/;

  private readonly logger = new ApiLogger(CsvBulkInviteParser.name);

  supports(file: Express.Multer.File): boolean {
    const name = file.originalname?.toLowerCase() ?? "";
    return file.mimetype === "text/csv" || name.endsWith(".csv");
  }

  parse(file: Express.Multer.File) {
    this.logger.log(`Parsing CSV bulk invite file: ${file.originalname}`);

    const content = file.buffer?.toString("utf8") ?? "";

    const rows = parse(content, {
      bom: true,
      skip_empty_lines: true,
      relax_column_count: true,
    }) as string[][];

    if (rows.length <= 1) {
      return { total: 0, valid: [], errors: [], skipped: [] };
    }

    this.hasValidHeaders(rows[0]);

    const dataRows = rows.slice(1);
    const valid: Array<{ row: number; name: string; email: string }> = [];
    const errors: Array<{ row: number; name: string; email: string; error: string }> = [];
    const skipped: Array<{ row: number; name: string; email: string; reason: string }> = [];
    const seenEmails = new Set<string>();

    dataRows.forEach((row, index) => {
      const [nameRaw = "", emailRaw = ""] = Array.isArray(row) ? row : [];
      const name = nameRaw.trim();
      const email = emailRaw.trim();
      const rowNumber = index + 2;

      const normalizedEmail = email.toLowerCase();
      if (
        !this.hasValidName(errors, rowNumber, email, name) ||
        !this.hasValidEmail(errors, rowNumber, name, email) ||
        !this.hasUniqueEmail(skipped, rowNumber, name, email, normalizedEmail, seenEmails)
      ) { return; }

      seenEmails.add(normalizedEmail);
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
    return CsvBulkInviteParser.EMAIL_REGEX.test(email);
  }

  private hasValidHeaders(row: string[]) {
    if (!Array.isArray(row)) {
      return false;
    }

    const normalizedHeaders = row.map((value) =>
      (value ?? "").toString().trim().toLowerCase()
    );

    const hasAllHeaders = CsvBulkInviteParser.HEADER.every((expected) =>
      normalizedHeaders.includes(expected)
    );

    if (!hasAllHeaders) {
      const missing = CsvBulkInviteParser.HEADER.filter(
        (expected) => !normalizedHeaders.includes(expected)
      );
      this.logger.error(`Missing CSV headers: ${missing.join(", ")}`);
      throw new BadRequestException("CSV file has invalid headers.");
    }
  }

  private hasValidName(errors, rowNumber: number, email: string, name: string) {
    if (!name) {
      errors.push({ row: rowNumber, name, email, error: "missing_name" });
      return false;
    }
    return true;
  }

  private hasValidEmail(errors, row: number, name: string, email: string) {
    if (!email) {
      errors.push({ row, name, email, error: "missing_email" });
      return false;
    }

    if (!this.isValidEmail(email)) {
      errors.push({ row, name, email, error: "invalid_email" });
      return false;
    }

    return true;
  }

  private hasUniqueEmail(skipped, row: number, name: string, email: string, normalizedEmail: string, seenEmails) {
    if (seenEmails.has(normalizedEmail)) {
      skipped.push({ row, name, email, reason: "duplicate_email" });
      return false;
    }

    return true;
  }
}
