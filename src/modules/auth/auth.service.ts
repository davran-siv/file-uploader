import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as c from 'config'
import { AuthJwtTokesDto, JwtRefreshTokenPayloadDto } from './interfaces/jwt.interface'
import { AuthJwtTokesResponseDTO, LoginByCredentialsDto, RefreshTokenDto } from './interfaces/login.interface'
import uuid = require('uuid')

export const mockedUser: UserResponseDTO = {
  id: '1',
  email: 'email@test.com'
}

interface UserResponseDTO {
  id: string,
  email: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {
  }

  async loginByCredentials(dto: LoginByCredentialsDto): Promise<AuthJwtTokesResponseDTO> {
    if (dto.email !== mockedUser.email) {
      throw new NotFoundException()
    }
    return this.generateTokensPair(mockedUser)
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthJwtTokesDto> {
    await this.jwtService.verifyAsync<JwtRefreshTokenPayloadDto>(dto.refreshToken)
              .catch(e => {
                throw new UnauthorizedException()
              })
    return this.generateTokensPair(mockedUser)
  }

  generateTokensPair(user: UserResponseDTO) {
    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user.id)
    return {
      accessToken,
      refreshToken
    }
  }

  private generateAccessToken(user: UserResponseDTO): string {
    return this.jwtService.sign(this.getAccessTokenPayload(user), {
      expiresIn: c.get('jwtToken.accessTokenExpiresIn')
    })
  }

  private generateRefreshToken(userId: string): string {
    const jwtid = uuid.v4()
    return this.jwtService.sign({
      id: userId
    }, {
      jwtid,
      expiresIn: c.get('jwtToken.refreshTokenExpiresIn')
    })
  }

  private getAccessTokenPayload(user: UserResponseDTO) {
    return {
      id: user.id,
      email: user.email
    }
  }
}
