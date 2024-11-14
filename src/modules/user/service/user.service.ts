import { Injectable } from '@nestjs/common';
import { CreateUserDto, User, UserFromDb } from '../models';
import { generateUid } from '../../../shared/utils';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UserService {

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      delete user.password;
      return {
        ...user,
        updatedAt: +user.updatedAt,
        createdAt: +user.createdAt
      };
    });
  }

  deleteUser(id: string) {
    return this.prisma.user.deleteMany({
      where: { id },
    });
  }

  pipeUser(user: UserFromDb) {
    delete user.password;
    return {
      ...user,
      createdAt: +user.createdAt,
      updatedAt: +user.updatedAt
    };
  }

  isUser(id: string) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async editUser(user: UserFromDb, newPass: string) {
    user.password = newPass;
    user.version++;
    await this.prisma.user.update({
      data: {
        ...user,
        updatedAt: new Date().getTime().toString(),
        createdAt: user.createdAt.toString()
      },
      where: {
        id: user.id,
      },
    });
    const clone = { ...user };
    delete clone.password;
    return clone;
  }

  async addUser(userDto: CreateUserDto) {
    const user: User = {
      ...userDto,
      id: generateUid(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toString(),
      },
    });
    delete createdUser.password;
    return createdUser;
  }

  constructor(private prisma: PrismaService) {
  }

}
