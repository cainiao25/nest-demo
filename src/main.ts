import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import { HttpExceptionFilter } from './interfacePreProcessing/http-exception.filter';
import { TransformInterceptor } from './interfacePreProcessing/transform.interceptor';

//nest 就会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。
async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  // 给请求地址添加前缀
  app.setGlobalPrefix('api/v1');
  app.use(session({
    secret: 'guang',
    resave: false,
    saveUninitialized: false
  }))
  await app.listen(1726);

}
bootstrap();
