import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//那么 nest 就会从 AppModule
// 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。
@Module({
  imports: [],
  controllers: [AppController], // controllers 是控制器，只能被注入。
  // providers: [AppService], //providers 里可以被注入，也可以注入别的对象，比如这里的 AppService。
  // 这就是 provider。
  // 这是一种简写，完整的写法是这样的：
  providers: [{
    // provide: AppService,
    provide: 'app_service', //AppService相当于token， 这里的token也可以是字符串
    useClass: AppService
  }],
  // 通过 provide 指定 token，通过 useClass 指定对象的类，
  // Nest 会自动对它做实例化后用来注入。
})
export class AppModule {}
