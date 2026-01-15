import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [AdminModule, AuthModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
