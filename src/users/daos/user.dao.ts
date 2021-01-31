import debug from "debug";
import * as shortid from "shortid";
import { UserDto } from "../dto/user.model";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UserDao {
  private static instance: UserDao;
  users: Array<UserDto> = [];

  constructor() {
    log("Created new instance of UserDao");
  }

  static getInstance(): UserDao {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao();
    }
    return UserDao.instance;
  }

  async addUser(user: UserDto) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }

  async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex(
      (obj: { email: string }) => obj.email === email
    );
    let currentUser = this.users[objIndex];
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }

  async putUserById(user: UserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === user.id
    );
    this.users.splice(objIndex, 1, user);
    return `${user.id} updated via put`;
  }

  async patchUserById(user: UserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === user.id
    );
    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
      "password",
      "firstName",
      "lastName",
      "permissionLevel",
    ];
    for (let field of allowedPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field];
      }
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;
  }

  async removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1);
    return `${userId} removed`;
  }
}

export default UserDao.getInstance();
