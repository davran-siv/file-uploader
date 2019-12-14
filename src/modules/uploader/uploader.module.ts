import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { generateFileName } from '../../utils'
import { UploaderController } from './uploader.controller'
import { UploaderService } from './uploader.service'

@Module({
    imports: [
      MulterModule.register({
        storage: diskStorage({
            destination: './uploads',
            filename: generateFileName
          }
        )
      })
    ],
    controllers: [UploaderController],
    providers: [UploaderService],
    exports: [UploaderModule]
  }
)
export class UploaderModule {

}
