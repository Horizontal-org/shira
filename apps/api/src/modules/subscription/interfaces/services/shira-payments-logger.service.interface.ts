
export interface IShiraPaymentsLoggerService {
  started(context: any): void;
  succeeded(context: any, status: number, duration: number): void;
  failed(context: any, status: number, duration: number, message: string): void;
  requestError(context: any, duration: number, message: string, stack?: string): void;
}
