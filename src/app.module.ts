import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//那么 nest 就会从 AppModule
// 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。
@Module({
  imports: [],
  controllers: [AppController], // controllers 是控制器，只能被注入。
  providers: [AppService], //providers 里可以被注入，也可以注入别的对象，比如这里的 AppService。
})
export class AppModule {}
