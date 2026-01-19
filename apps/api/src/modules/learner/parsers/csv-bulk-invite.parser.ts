import { Injectable } from "@nestjs/common";
import { parse } from "csv-parse/sync";
import { IBulkInviteParser } from "../interfaces/parsers/bulk-invite-parser.interface";
import { ApiLogger } from "../logger/api-logger.service";
import { CSVParsingException } from "../exceptions/csv-bulk-parse.learner.exception";
import { TooManyRowsException } from "../exceptions/csv-bulk-too-many-rows.learner.exception";
import { InvalidHeadersException } from "../exceptions/csv-bulk-invalid-headers.learner.exception";

const HEADERS = ["name", "email"];
const MAX_ROWS = 1000;
const EMAIL_REGEX = /^[^\s@]+@([A-Za-z0-9_-]+\.)+[A-Za-z0-9_-]{2,}$/;

@Injectable()
export class CsvBulkInviteParser implements IBulkInviteParser {

  private readonly logger = new ApiLogger(CsvBulkInviteParser.name);

  supports(file: Express.Multer.File): boolean {
    const name = file.originalname?.toLowerCase() ?? "";
    return file.mimetype === "text/csv" || name.endsWith(".csv");
  }

  parse(file: Express.Multer.File) {
    this.logger.log(`Parsing CSV bulk invite file: ${file.originalname}`);

    const content = file.buffer?.toString("utf8") ?? "";

    let rows: string[][];
    try {
      rows = parse(content, { bom: true, skip_empty_lines: true, relax_column_count: true }) as string[][];
    } catch (e) {
      this.logger.error(`Error parsing CSV file: ${e.message}`);
      throw new CSVParsingException();
    }

    if (rows.length <= 1) {
      return { total: 0, valid: [], errors: [], skipped: [] };
    }

    if (rows.length > MAX_ROWS) {
      throw new TooManyRowsException(`There are too many rows in CSV - maxRows: ${MAX_ROWS}, detectedRows: ${rows.length}`);
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
    return EMAIL_REGEX.test(email);
  }

  private hasValidHeaders(row: string[]) {
    if (!Array.isArray(row)) {
      return false;
    }

    const normalizedHeaders = row.map((value) =>
      (value ?? "").toString().trim().toLowerCase()
    );

    const hasAllHeaders = HEADERS.every((expected) =>
      normalizedHeaders.includes(expected)
    );

    if (!hasAllHeaders) {
      const missing = HEADERS.filter(
        (expected) => !normalizedHeaders.includes(expected)
      );
      throw new InvalidHeadersException(`Missing CSV headers: ${missing.join(", ")}`);
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
      skipped.push({ row, name, email, reason: "duplicated_email" });
      return false;
    }

    return true;
  }
}
