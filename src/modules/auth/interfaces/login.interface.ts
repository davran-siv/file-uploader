import { IsNotEmpty, IsString } from 'class-validator'

export class LoginByCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: string
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}

export interface AuthJwtTokesResponseDTO {
  accessToken: string
  refreshToken: string
}
