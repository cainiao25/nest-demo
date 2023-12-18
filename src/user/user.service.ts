import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha'
import { EmailService } from '../tools/EmailTool/EmailService';
/**
 * 这里是提供给user的一些api
 */
@Injectable()
export class UserService {
    constructor(private readonly emailTool: EmailService) {}
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

    /**
     * 验证码配置
     */
    captchaArrangement() {
        return svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 34,
            background: '#cc9966'
        });
    }

    /**
     * 邮箱验证码
     * @param email - 邮件主体信息
     */
    async sendVerificationEmail(email: string) {
        const code = Math.random().toString().slice(-6);
        const context = {

            // 这里填充EJS模板所需的数据
            code,
            date: new Date().toLocaleString(),
            sign: '系统邮件,回复无效。'
        };

        try {
            await this.emailTool.sendEmail({
                email: email,
                subject: '邮箱验证',
                template: 'validate.code.ejs', // EJS模板文件名
                context: context
            });

            return { success: true, message: '验证邮件已发送' };
        } catch (error) {
            console.error('邮件发送失败', error);
            return { success: false, message: '邮件发送失败' };
        }
    }



}
