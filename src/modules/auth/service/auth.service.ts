import {
  BadRequestException, Body,
  ConflictException,
  ForbiddenException,
  Injectable, InternalServerErrorException,
  NotFoundException, UnauthorizedException, ValidationPipe,
} from '@nestjs/common';
import { RefreshTokenDto, SignupDto } from '../models/auth.model';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { generateUid } from '../../../shared/utils';
import { DatabaseError, PRISMA_ERRORS, ValidationError } from 'src/validation-errors';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  async register(@Body(ValidationPipe) body: SignupDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where:
          { login: body.login },
      });

      if (user) {
        delete user.password;
        return user;
      }
      const salt = parseInt(process.env.CRYPT_SALT);
      const hashedPassword = await bcrypt.hash(body.password, salt);

      const result = await this.prisma.user.create({
        data: {
          login: body.login,
          password: hashedPassword,
          version: 1,
          createdAt: new Date().getTime().toString(),
          updatedAt: new Date().getTime().toString(),
          id: generateUid(),
        },
      });
      delete result.password;
      return result;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async userValidation(data: SignupDto) {
    const userFromBd = await this.prisma.user.findFirst({ where: { login: data.login } });
    if (!userFromBd) {
      return null;
    }
    const isPassValid = await bcrypt.compare(data.password, userFromBd.password);
    if (isPassValid) {
      return userFromBd;
    }
    return null;
  }

  async login(@Body(ValidationPipe) body: SignupDto) {
    try {
      const userFromBd = await this.userValidation(body);
      if (!userFromBd) {
        throw new ValidationError(402);
      }
      const payload = {
        login: userFromBd.login,
        userId: userFromBd.id,
      };
      return {
        ...payload,
        accessToken: this.jwt.sign(payload),
        refreshToken: this.jwt.sign(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async refreshToken(body: RefreshTokenDto) {
    if (!body.refreshToken) {
      throw new UnauthorizedException('No refresh in body');
    }
    try {
      const refresh = this.jwt.verify(body.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      const userFromBd = await this.prisma.user.findFirst({
        where: { id: refresh.userId },
      });
      if(!userFromBd) {
        throw new ValidationError(404);
      }
      const payload = {
        login: refresh.login,
        userId: refresh.userId,
      }

      return {
        ...payload,
        accessToken: this.jwt.sign(payload),
        refreshToken: this.jwt.sign(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        })
      }
    } catch (error) {
      throw new ForbiddenException(
        'Authentication failed (Refresh token is invalid or expired)',
      );
    }
  }

  handleExceptions(error: any) {

    if (error instanceof ValidationError || error instanceof DatabaseError) {
      if (error.code === 1)
        throw new BadRequestException('userId is invalid (not uuid)');
      if (error.code > 200 && error.code < 205) {
        throw new NotFoundException(error.message);
      }
      if (error.code === 101) {
        throw new ForbiddenException(error.message);
      }
      if (error.code === 3) {
        throw new BadRequestException(error.message);
      }
      if (error.code === 401) {
        throw new ConflictException('Login already exists');
      }
      if (error.code === 402) {
        throw new ForbiddenException('Incorrect password or login');
      }
    } else if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code in PRISMA_ERRORS.user
    ) {
      throw new NotFoundException(PRISMA_ERRORS.user.P2025);
    } else {
      throw new InternalServerErrorException(
        'Internal Server Error',
      );
    }
  }

  constructor(private prisma: PrismaService, private jwt: JwtService) {
  }
}
