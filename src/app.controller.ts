import {
  Body,
  Controller, FileTypeValidator,
  Get, HttpException, MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './tools/fileUpload/storage';
import { FileSizeValidationPipe } from './file-size-validation-pipe.pipe';
import { MyFileValidator } from './tools/fileUpload/myFileValidator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * 单文件上传
   * @param file
   * @param body
   */
  @Post('single_file_upload')
  @UseInterceptors(FileInterceptor('upload', {
    dest: 'uploads'
  }))

  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ParameterDecorator
  ) {
    console.log('body', body);
    console.log('file 单文件', file);
  }


  /**
   * 多文件上传
   * @param files
   * @param body
   */
  @Post('multi_file_uploads')
  @UseInterceptors(FilesInterceptor('upload',  3, {
    dest: 'uploads'
  }))

  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: ParameterDecorator
  ) {
    console.log('body', body);
    console.log('files 多文件', files);
  }


  /**
   * 多个文件的字段
   * @param files
   * @param body
   */
  @Post('multipleFields_file_uploads')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'aaa', maxCount: 2},
    { name: 'bbb', maxCount: 3},
  ],{
    dest: 'uploads'
  }))
  uploadFileFields(
    @UploadedFiles() files: {
      aaa?: Express.Multer.File[],
      bbb?: Express.Multer.File[]
      },
    @Body() body: ParameterDecorator
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  /**
   * 如果并不知道有哪些字段是 file 可以使用 AnyFilesInterceptor
   * @param files
   * @param body
   */
  @Post('AnyFilesInterceptor')

  @UseInterceptors(AnyFilesInterceptor({
    dest: 'uploads',
  }))
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: ParameterDecorator
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  /**
   * 指定 storage
   * @param files
   * @param body
   */
  @Post('AnyFilesInterceptor_specifyStorage')

  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  uploadAnyFiles2
  (@UploadedFiles() files: Array<Express.Multer.File>,
  @Body() body: ParameterDecorator
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  /**
   * 使用pipe自定义上传文件校验规则
   * @param file
   * @param body
   */
  @Post('pie_customize_file_uploads')
  @UseInterceptors(FileInterceptor('upload',{
    dest: 'uploads'
  }))
  uploadFile2(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Body() body: ParameterDecorator
  ){
    console.log('body', body);
    console.log('file', file);
  }

  /**
   * 使用nest内置功能进行校验 调用传入的 validator 来对文件做校验
   * @param file
   * @param body
   */
  @Post('nest_built_verify_file_uploads')
  @UseInterceptors(FileInterceptor('upload', {
    dest: 'uploads'
  }))
  uploadFile3(@UploadedFile(new ParseFilePipe({
    // 调用传入的 validator 来对文件做校验
    exceptionFactory: error => {
      throw new HttpException('xxx' + error, 404)
    },
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000 }),
      new FileTypeValidator({ fileType: 'image/jpeg' }),
    ],
  })) file: Express.Multer.File, @Body() body:  ParameterDecorator) {
    console.log('body', body);
    console.log('file', file);
  }

  /**
   * 使用nest内置功能进行校验 自己实现这样的 validator，只要继承 FileValidator 就可以：
   * @param file
   * @param body
   */
  @Post('nest_built_verify_file_uploads_2')
  @UseInterceptors(FileInterceptor('upload', {
    dest: 'uploads'
  }))
  uploadFile4(@UploadedFile(new ParseFilePipe({
    // 自己实现这样的 validator，只要继承 FileValidator 就可以：
    validators: [
     new MyFileValidator({})
    ],
  })) file: Express.Multer.File, @Body() body:  ParameterDecorator) {
    console.log('body', body);
    console.log('file', file);
  }











}
