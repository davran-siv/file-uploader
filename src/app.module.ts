import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UploaderModule } from './modules/uploader/uploader.module'

@Module({
  imports: [
    UploaderModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
