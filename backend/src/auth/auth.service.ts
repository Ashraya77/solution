import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import type { Response } from 'express';

type Admin = {
  id: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string, response: Response) {
    const admin: Admin | null = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) throw new UnauthorizedException('Admin not found');

    const match = password.trim() === admin.password.trim();

    if (!match) throw new UnauthorizedException('Password does not match');

    const payload = { sub: admin.id };
    const access_token = this.jwtService.sign(payload);

    // Set httpOnly cookie
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
      sameSite: 'lax', // or 'lax' if you need cross-site requests
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    return {
      message: 'Login successful',
    };
  }

  logout(response: Response) {
    response.clearCookie('access_token', { path: '/' });
    return { message: 'Logout successful' };
  }
}
