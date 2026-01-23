import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  getDashboard(@Req() req) {
    // req.user contains what `validate()` returned in JwtStrategy
    return { message: 'Welcome admin!', adminId: req.user.adminId };
  }
}
