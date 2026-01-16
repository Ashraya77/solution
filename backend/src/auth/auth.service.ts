import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

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

  async login(email: string, password: string) {
    const admin: Admin | null = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) throw new UnauthorizedException();

    console.log(admin.password);
    const match = password.trim() === admin.password.trim();
    console.log(match);
    if (!match) throw new UnauthorizedException();

    const payload = { sub: admin.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
