import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import type { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string, response: Response) {
    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, admin.password);

    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: admin.id, username: admin.username };
    const access_token = this.jwtService.sign(payload);

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login successful',
      access_token,
      admin: {
        id: admin.id,
        username: admin.username,
      },
    };
  }

  logout(response: Response) {
    response.clearCookie('access_token', { path: '/' });
    return { message: 'Logout successful' };
  }
}
