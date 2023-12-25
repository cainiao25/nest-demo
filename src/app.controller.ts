import { Body, Post, Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import {AaaDto } from './aaa.dto'
import { UnLoginException } from './unlogin.filter';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
    throw new UnLoginException()
    return this.appService.getHello();
  }

  @Post('aaa')
  aaa(@Body () aaaDto: AaaDto){
    console.log(aaaDto,'aaaDto');
    return 'success'
  }
}
