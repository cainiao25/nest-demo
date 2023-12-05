import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

// Controller 是单独的装饰器
@Controller()
export class AppController {
  // AppController 的构造器参数依赖了 AppService。
  // constructor(private readonly appService: AppService) {}
  // 所以 AppController 只是声明了对 AppService 的依赖，就可以调用它的方法了
  // 在 AppController 的构造器里参数里声明了 AppService 的依赖，就会自动注入：
  // 如果不想用构造器注入，也可以属性注入：
  // @Inject(AppService)
  @Inject('app_service') // 如果token是字符串的话，注入的时候就要用 @Inject 手动指定注入对象的 token 了：
  private readonly appService: AppService


  @Get()
  getHello(): string {
    return this.appService.getHello(); // 调用AppService的方法
  }
}
