import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {
  getHello(): string {
    return 'Hello World!';
  }
}
