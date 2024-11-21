import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register(
      {
        secret: process.env.JWT_SECRET as string,
        signOptions: {
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }
      }
    )
  ],
  controllers: [AuthController],
  providers: [
    AuthService],
  exports: [AuthService],
})
export class AuthModule {}
