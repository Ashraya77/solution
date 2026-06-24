import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

type RequestWithCookies = Request & {
  cookies?: {
    access_token?: string;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          const requestWithCookies = request as RequestWithCookies;
          return requestWithCookies.cookies?.access_token ?? null;
        },
      ]),
      secretOrKey:
        configService.get<string>('JWT_SECRET') ?? 'development-only-change-me',
    });
  }

  validate(payload: { sub: string; username: string }) {
    return { adminId: payload.sub, username: payload.username };
  }
}
