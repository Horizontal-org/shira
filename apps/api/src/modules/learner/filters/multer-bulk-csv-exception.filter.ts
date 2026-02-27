import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { MulterError } from "multer";
import { BulkCsvFileTooLargeException } from "../exceptions";
import { BulkCsvProcessingException } from "../exceptions/csv-bulk-could-not-process.learner.exception";

@Catch(MulterError)
export class MulterBulkCsvExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const mapped =
      exception.code === "LIMIT_FILE_SIZE"
        ? new BulkCsvFileTooLargeException()
        : new BulkCsvProcessingException();

    const status = mapped.getStatus();
    const body = mapped.getResponse();

    if (typeof body === "string") {
      response.status(status).json({ statusCode: status, message: body });
      return;
    }

    response.status(status).json(body);
  }
}
