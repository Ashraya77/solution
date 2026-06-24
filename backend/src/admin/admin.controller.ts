import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

type AuthenticatedRequest = Request & {
  user: {
    adminId: string;
  };
};

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  getDashboard(@Req() req: AuthenticatedRequest) {
    return { message: 'Welcome admin!', adminId: req.user.adminId };
  }
}
