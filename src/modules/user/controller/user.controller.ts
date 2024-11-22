import {
  BadRequestException,
  Body,
  Controller, Delete, ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post, Put,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto, UpdatePasswordDto, UserResponse } from '../models';
import { isUUID } from "class-validator";
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller("user")
export class UserController {

  @Get()
  @ApiOkResponse({ description: 'Returns users.', type: [UserResponse] })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: 'Return user', type: UserResponse })
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    return this.userService.addUser(createUserDto);
  }

  @Get(":id")
  @ApiOkResponse({ description: 'Return user', type: UserResponse })
  async findOne(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const user: User = await this.userService.getUser(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteOne(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.userService.deleteUser(user.id);
  }

  @Put(":id")
  @ApiOkResponse({ description: 'Edit user', type: UserResponse })
  async editUser(@Param("id") id: string, @Body(ValidationPipe) body: UpdatePasswordDto) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const user: User = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if(body.oldPassword !== user.password) {
      throw new ForbiddenException("Incorrect password");
    }
    return this.userService.editUser(user, body.newPassword);

  }

  constructor(private userService: UserService) {
  }
}
