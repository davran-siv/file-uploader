import { Controller, Get, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploaderService } from './uploader.service'

@Controller('/uploader')
export class UploaderController {
  constructor(private readonly service: UploaderService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  @HttpCode(200)
  uploadFile(@UploadedFile() file) {
    console.log(file)
  }
}
