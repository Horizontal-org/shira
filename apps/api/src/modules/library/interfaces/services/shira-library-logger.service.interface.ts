export interface ShiraLibraryLogContext {
  requestId: string
  method: string
  url?: string
}

export interface IShiraLibraryLoggerService {
  started(context: ShiraLibraryLogContext): void
  succeeded(context: ShiraLibraryLogContext, status: number, duration: number): void
  failed(context: ShiraLibraryLogContext, status: number, duration: number, message: string): void
  requestError(context: ShiraLibraryLogContext, duration: number, message: string, stack?: string): void
}
