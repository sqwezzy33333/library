import { Injectable } from '@nestjs/common';
import { SignupDto } from '../models/auth.model';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { generateUid } from '../../../shared/utils';

@Injectable()
export class AuthService {
  async register(body: SignupDto) {
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
    }
  }

  constructor(private prisma: PrismaService, private jwt: JwtService) {
  }
}
