export interface JwtPayloadDto extends JwtUserPayload {
  iat: number
  exp: number
}

export interface JwtUserPayload {
  id: string
  email: string
}

export interface JwtRefreshTokenPayloadDto {
  id: string
  iat: number
  exp: number
  jti: string
}

export interface AuthJwtTokesDto {
  accessToken: string
  refreshToken: string
}
