import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../models";
import { isUUID } from "class-validator";

@Controller("user")
export class UserController {

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  @HttpCode(201)
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    return this.userService.addUser(createUserDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = this.userService.isUser(id);
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  constructor(private userService: UserService) {
  }
}