import { Injectable } from '@nestjs/common';

/**
 * 这里是提供给user的一些api
 */
@Injectable()
export class UserService {

    /**
     * 获取用户信息
     */
    getUsers(){
        return {
            code: 0,
            data: [],
            mgs: '请求用户列表成功'
        }
    }

    /**
     * 添加用户信息
     */
    addUser(){
        return {
            code: 0,
            data: {},
            mgs: '添加用户成功'
        }
    }
}
