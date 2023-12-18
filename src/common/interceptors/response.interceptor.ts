// src/common/interceptors/response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface ResponseData {
    code?: number;
    message?: string;
    data?: any
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        return next.handle().pipe(
          map((data: ResponseData) => {
              // 检查data是否是对象，并且具有期望的属性
              if (data && typeof data === 'object') {
                  return {
                      code: 200, // 如果data.code存在则使用，否则默认为200
                      data: data.data ?? [], // 如果data.data存在则使用，否则默认为null
                      message: data.message ?? '请求成功' // 如果data.message存在则使用，否则默认为'操作成功'
                  };
              }

              return data;
          }),
        );

        // return next.handle().pipe(
        //   map(data => {
        //       // 您可以在这里修改响应数据
        //       // 例如，包装默认的响应格式
        //       return {
        //           statusCode: context.switchToHttp().getResponse().statusCode,
        //           data,
        //       };
        //   }),
        // );
    }
}
