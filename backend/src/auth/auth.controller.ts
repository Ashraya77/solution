import { Body, Controller, Post, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() input: { username: string; password: string },
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.authenticate(input);
    
    // Set httpOnly cookie with the JWT token
    response.cookie('token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Return user data (without the token in response body)
    return {
      success: true,
      user: result.username, // Optional: return user info if needed
    };
  }
}