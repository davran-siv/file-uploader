import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AuthModule } from '../src/modules/auth/auth.module'
import { mockedUser } from '../src/modules/auth/auth.service'
import { AuthJwtTokesResponseDTO } from '../src/modules/auth/interfaces/login.interface'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({
        email: mockedUser.email
      })
      .expect(200)
      .expect(res => {
        const resp = res.body as AuthJwtTokesResponseDTO
        expect(resp).toHaveProperty('accessToken')
        expect(resp).toHaveProperty('refreshToken')
      })
  })

  it('/auth/refreshToken (POST)', async () => {
    const loginRequest = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: mockedUser.email
      })
    return request(app.getHttpServer())
      .post('/auth/refreshToken')
      .send({
        refreshToken: loginRequest.body.refreshToken
      })
      .expect(200)
      .expect(res => {
        const resp = res.body as AuthJwtTokesResponseDTO
        expect(resp).toHaveProperty('accessToken')
        expect(resp).toHaveProperty('refreshToken')
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
