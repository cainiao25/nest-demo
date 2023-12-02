import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigEnum } from './enum/config.enum';
import * as dotenv from 'dotenv'

// const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath,
      // load: [() => dotenv.config({ path: '.env'})]
    }), //.forRoot()是读取根目录的.env文件  isGlobal: true 开启为true就可以全局使用， 可以在private上引用。
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get(ConfigEnum.DB_HOST),
    //     port: configService.get(ConfigEnum.DB_PORT),
    //     username: configService.get(ConfigEnum.DB_USERNAME),
    //     password: configService.get(ConfigEnum.DB_PASSWORD),
    //     synchronize: configService.get(ConfigEnum.DB_SYNC),
    //     database: configService.get(ConfigEnum.DB_DATABASE),
    //     entities: [],
    //     //同步本地的schema与数据库 -》 初始化的时候去使用
    //     logging: ['error']
    //   } as TypeOrmModuleAsyncOptions)
    // })
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      synchronize: true,
      database: 'mysql',
      entities: [],
      //同步本地的schema与数据库 -》 初始化的时候去使用
      logging: ['error']
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
