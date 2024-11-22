import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RefreshTokenDto, SignupDto } from '../models/auth.model';

@Controller('auth')
export class AuthController {

  @Post('signup')
  @HttpCode(201)
  signup(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.register(signupDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.login(signupDto);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() refresh: RefreshTokenDto) {
    return this.authService.refreshToken(refresh);
  }

  constructor(private readonly authService: AuthService) {}
}
