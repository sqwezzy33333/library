import { Injectable } from "@nestjs/common";
import { db } from "../../../db/db";
import { CreateUserDto, User } from "../models";
import { generateUid } from "../../../shared/utils";

@Injectable()
export class UserService {

  getUsers() {
    return db.users;
  }

  deleteUser(user: User) {
    db.users.splice(db.users.indexOf(user));
  }

  editUser(user: User, newPass: string) {
    user.password = newPass;
    user.updatedAt = new Date().getTime();
    user.version++;
    return user;
  }

  addUser(userDto: CreateUserDto) {
    const user = {
      ...userDto,
      id: generateUid(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    db.users.push(user);
    return user;
  }

  isUser(id: string) {
    return db.users.find(x => x.id === id);
  }

}