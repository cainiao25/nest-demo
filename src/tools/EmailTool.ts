import * as nodemailer from "nodemailer";
import { EMAIL } from "../config";
import { Injectable } from '@nestjs/common';

@Injectable() //加这个表示可被注入的
export class Email {
    private transporter: nodemailer.Transporter;

    constructor(){
        // 通过nodemailer的createTransport方法创建这个服务，将config中的参数依次传入

        // 使用 NodeMailer 的 createTransport 方法创建邮件发送服务
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
    async send(email: string, subject: string = '您的验证码'): Promise<void> {
        const code = Math.random().toString().slice(-6);
        const html = `<p>您的验证码是：<strong>${code}</strong>。</p>`;

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


    // async sendMail(email: string, subject: string): Promise<void> {
    //     const code = Math.random().toString().slice(-6);
    //     const html = `<p>您的验证码是：<strong>${code}</strong>。</p>`;
    //     const options: nodemailer.SendMailOptions = {
    //         from: `${EMAIL.alias}<${EMAIL.user}>`, // 发件人
    //         to: email, // 收件人
    //         subject: subject, // 主题
    //         html: html, // HTML 内容
    //     };
    //
    //     try {
    //         const info = await this.transporter.sendMail(options);
    //         console.log("邮件发送成功", info);
    //     } catch (error) {
    //         console.error("邮件发送失败", error);
    //         throw new Error("邮件发送失败");
    //     }
    // }

}
