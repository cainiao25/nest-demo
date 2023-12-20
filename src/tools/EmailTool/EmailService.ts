import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { EMAIL } from "./config"

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // 邮件发送配置
        this.transporter = nodemailer.createTransport({
            host: EMAIL.host, // 邮箱服务器地址
            port: EMAIL.port, // 端口
            secure: EMAIL.secure, // 是否使用SSL
            auth: {
                user: EMAIL.user, // 发送邮件的邮箱
                pass: EMAIL.pass // 邮箱密码
            }
        });
    }

    async sendEmail(data: {
        email: string,
        subject?: string,
        template: string, // EJS模板名称
        context: any // 传递给模板的数据
    }): Promise<{ success: boolean; message?: string }> {
        try {
            // 渲染EJS模板
            const html = await this.renderTemplate(data.template, data.context);
            // 邮件选项
            const mailOptions: nodemailer.SendMailOptions = {
                from: `${EMAIL.alias} <${EMAIL.user}>`, // 发件人
                to: data.email, // 收件人
                subject: data.subject || '用户邮箱验证', // 邮件主题
                html,
            };

            await this.transporter.sendMail(mailOptions);
            console.log(`邮件成功发送至: ${data.email}, 主题: ${data.subject}`);
            return { success: true };
        } catch (error) {
            console.error(`发送邮件至: ${data.email} 失败, 主题: ${data.subject}`, error);
            return { success: false, message: error.message };
        }
    }

    private async renderTemplate(templateName: string, context: any): Promise<string> {
        // 模板文件路径
        const templatePath = path.join(process.cwd(), 'src/tools/EmailTool/template/validate.code.ejs')
        return new Promise((resolve, reject) => {
            ejs.renderFile(templatePath, context, {}, (err, str) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(str);
                }
            });
        });
    }
}
