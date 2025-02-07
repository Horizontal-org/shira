import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

@Injectable()
export class ResponseNoCacheInterceptor implements NestInterceptor {
    intercept(context:ExecutionContext, next:CallHandler): Observable<any> {

        const ResponseObj:ExpressResponse = context.switchToHttp().getResponse();
        ResponseObj.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        ResponseObj.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        ResponseObj.setHeader("Expires", "0"); 
        return next.handle();
    }
}