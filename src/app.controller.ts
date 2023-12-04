import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller 是单独的装饰器
@Controller()
export class AppController {
  // AppController 的构造器参数依赖了 AppService。
  constructor(private readonly appService: AppService) {}
  // 所以 AppController 只是声明了对 AppService 的依赖，就可以调用它的方法了

  @Get()
  getHello(): string {
    return this.appService.getHello(); // 调用AppService的方法
  }
}
