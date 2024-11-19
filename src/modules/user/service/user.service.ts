import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponse } from '../models';
import { generateUid } from '../../../shared/utils';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {

  async getUsers(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map(this.pipeUser);
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  pipeUser = (user: User): UserResponse => {
    delete user.password;
    return {
      ...user,
      updatedAt: +user.updatedAt,
      createdAt: +user.createdAt,
    };
  };

  deleteUser(id: string) {
    return this.prisma.user.deleteMany({
      where: { id },
    });
  }

  async editUser(user: User, password: string) {
    user.version++;
    const userFromBd: User = await this.prisma.user.update({
      data: {
        password,
        updatedAt: new Date().getTime().toString(),
        version: user.version++
      },
      where: {
        id: user.id,
      },
    });
    return this.pipeUser(userFromBd);
  }

  async addUser(userDto: CreateUserDto) {
    const createdUser: User = await this.prisma.user.create({
      data: {
        ...userDto,
        version: 1,
        createdAt: new Date().getTime().toString(),
        id: generateUid(),
        updatedAt: new Date().getTime().toString(),
      },
    });
    return this.pipeUser(createdUser);
  }

  constructor(private prisma: PrismaService) {
  }

}
