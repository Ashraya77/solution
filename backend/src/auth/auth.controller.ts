import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.auth.login(body.username, body.password, response);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.auth.logout(response);
  }
}
