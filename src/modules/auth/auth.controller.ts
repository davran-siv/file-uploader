import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthJwtTokesResponseDTO, LoginByCredentialsDto, RefreshTokenDto } from './interfaces/login.interface'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  @HttpCode(200)
  async loginByCredentials(@Body() dto: LoginByCredentialsDto): Promise<AuthJwtTokesResponseDTO> {
    return this.authService.loginByCredentials(dto)
  }

  @Post('/refreshToken')
  @HttpCode(200)
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<AuthJwtTokesResponseDTO> {
    return this.authService.refreshToken(dto)
  }
}
