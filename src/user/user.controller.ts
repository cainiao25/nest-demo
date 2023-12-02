import { Controller, Get, Post } from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    // 语法糖， 代表this.userService = new UserSeervice(); 这里是通过private userService: UserService 定义出来了
    constructor(private userService: UserService) {
    }
    @Get()
    getUser(): any {
        return this.userService.getUsers() //这样就可以调用service的方法了
    }

    @Post()
    addUser(): any{
        return this.userService.addUser()
    }

}
