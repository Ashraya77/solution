import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {  }
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
    login(@Body() input:{username: string, password: string}){
        return this.authService.authenticate(input)
    }

}
