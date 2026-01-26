import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  getDashboard(@Req() req) {
    // req.user contains what `validate()` returned in JwtStrategy
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Welcome admin!', adminId: req.user.adminId };
  }
}
