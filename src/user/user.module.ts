import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [UserService]
})
export class UserModule {}
