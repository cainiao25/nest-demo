import {
  Controller,
  Get,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import { Aaa } from "./aaa.decorator";
import { AaaGuard } from './aaa.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @SetMetadata('aaa', 'admin')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
