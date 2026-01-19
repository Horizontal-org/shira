export enum BulkUploadErrorCode {
  TooManyRows = "too_many_rows",
  CouldNotProcess = "could_not_process",
  MissingName = "missing_name",
  MissingEmail = "missing_email",
  InvalidEmail = "invalid_email",
  DuplicatedEmail = "duplicated_email"
}

export enum BulkCsvParseErrorCode {
  InvalidHeaders = "invalid_headers",
  CSVParsingError = "csv_parsing_error",
}