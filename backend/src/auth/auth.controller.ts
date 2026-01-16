import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.auth.login(body.email, body.password, response);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.auth.logout(response);
  }
}