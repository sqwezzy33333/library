import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignupDto } from '../models/auth.model';

@Controller()
export class AuthController {

  @Post('signup')
  @HttpCode(201)
  signup(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.register(signupDto);
  }

  constructor(private readonly authService: AuthService) {}
}
