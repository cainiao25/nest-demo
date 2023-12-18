import * as nodemailer from "nodemailer";
import { EMAIL } from "../config";
import { Injectable } from '@nestjs/common';

@Injectable() //加这个表示可被注入的
export class Email {
    private transporter: nodemailer.Transporter;

    constructor(){
        // 通过nodemailer的createTransport方法创建邮件发送服务，将config中的参数依次传入
        this.transporter = nodemailer.createTransport({
            host: EMAIL.host,
            port: EMAIL.port,
            secure: EMAIL.secure,
            auth: {
                user: EMAIL.user,
                pass: EMAIL.pass,
            },
        });
    }
    // 方法：发送邮件
    async send(email: string, subject: string = '博客平台邮箱检验提醒'): Promise<void> {
        const code = Math.random().toString().slice(-6);
        const html =
            `
              <div>
                您本次的验证码是<span style="color:#FFB6C1; font-weight:700; font-size:24px">${code}</span>, 验证码有效期是30分钟 
              </div>
            `
        const mailOptions: nodemailer.SendMailOptions = {
            from: `${EMAIL.alias}<${EMAIL.user}>`,
            to: email,
            subject,
            html: html,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('邮件发送成功');
        } catch (error) {
            console.error('邮件发送失败', error);
            throw new Error('邮件发送失败');
        }
    }

}
