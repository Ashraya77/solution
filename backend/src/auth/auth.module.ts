import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/jwt-secret';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [AdminModule, JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {expiresIn: '1d'}
    }),]
})
export class AuthModule {}
