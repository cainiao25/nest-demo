import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import {UserService} from "./user.service";
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';
import * as svgCaptcha from 'svg-captcha'
@Controller('user')
export class UserController {
    // 语法糖， 代表this.userService = new UserSeervice(); 这里是通过private userService: UserService 定义出来了
    constructor(
      private userService: UserService,
      private configService: ConfigService
    ) { }
    @Get()
    getUser(): any {
        // .env的使用
        // const db = this.configService.get(ConfigEnum.DB_TYPE) //在app.module的配置里面 isGlobal: true, 这样全局都可以访问到。 ConfigEnum.DB_TYPE是设置的枚举
        // console.log(db, 'db打印');
        // const dbport = this.configService.get(ConfigEnum.DB_PORT)
        // console.log(dbport,'dbport');
        // yml的使用
        const data = this.configService.get('db')
        console.log(data,'data');
        console.log(data.mysql1.port, 'port');
        return this.userService.getUsers() //这样就可以调用service的方法了

    }

    @Post()
    addUser(): any{
        return this.userService.addUser()
    }

    @Get('code')
    createCaptcha(@Req() req, @Res() res, @Session() session) {
        const Captcha = this.userService.captchaArrangement();

        session.code = Captcha.text
        console.log(session.code,'session.code');
        res.type('image/svg+xml');
        res.send(Captcha.data);
    }

    @Post('create')
    createUser (@Body() Body, @Session() session){
        console.log(Body, session.code);
        return {
            code: 200,
        }
    }

    @Get('sss')
    sss(@Session() session) {
        console.log(session, 'session')
        session.count = session.count ? session.count + 1 : 1;
        return session.count;
    }


}
