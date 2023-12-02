import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//nest 就会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 给请求地址添加前缀
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
