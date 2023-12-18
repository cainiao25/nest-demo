import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { Email } from '../tools/EmailTool'; // 引入 Email 类


@Module({
  imports:[
    JwtModule.registerAsync({
      async useFactory() {
        await 111;
        return {
          secret: 'guang',
          signOptions: {
            expiresIn: '7d'
          }
        }
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, Email],
})
export class UserModule {}
