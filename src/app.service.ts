import { Injectable } from '@nestjs/common';

// AppService 是被 @Injectable 修饰的 class
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
