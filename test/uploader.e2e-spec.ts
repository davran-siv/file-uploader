import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AuthModule } from '../src/modules/auth/auth.module'
import { mockedUser } from '../src/modules/auth/auth.service'
import { AuthJwtTokesResponseDTO } from '../src/modules/auth/interfaces/login.interface'
import { UploaderModule } from '../src/modules/uploader/uploader.module'

describe('UploaderController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UploaderModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/uploader (POST)', async () => {
    const loginRequest = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: mockedUser.email
      })
    return request(app.getHttpServer())
      .post('/uploader')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${loginRequest.body.accessToken}`)
      .attach('file', './test/forTesting/test.jpg')
      .expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
