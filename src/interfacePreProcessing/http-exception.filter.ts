/* all-exception.filter.ts */

// 引入所需内置对象
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger
} from '@nestjs/common';
import moment from 'moment';

// 们需要访问底层平台 `Request`和 `Response`
import { Request, Response } from 'express';

// 它负责捕获作为`HttpException`类实例
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger();
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        // 用于接收主动发错的错误信息
        // const { message, code } = exception.getResponse() as any;
        // response.status(status).json({
        //     code: code || status,
        //     timestamp: moment().format('yyyy-MM-DD HH:mm:ss'),
        //     path: request.url,
        //     error: 'Bad Request',
        //     message,
        // });

        const exceptionResponse = exception.getResponse();

        // 假设你有一个内部日志系统，你可以在这里记录详细的错误信息
        // logService.error({
        //     message: exception.message,
        //     exceptionResponse,
        //     url: request.url,
        //     time: moment().format('YYYY-MM-DD HH:mm:ss'),
        // });
        this.logger.error(request,'444');
        // console.log(request,'request');

        // 现在构建一个简化的错误响应对象发送给前端
        response.status(status).json({
            code: status, // 可以使用通用的code，如 "ERROR" 或特定的业务逻辑码
            message: '请求失败' // 这是一个通用的错误消息
        });
    }
}

