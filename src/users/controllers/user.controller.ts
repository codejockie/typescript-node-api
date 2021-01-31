import debug from "debug";
import * as argon2 from "argon2";
import { Request, Response } from "express";
import userService from "../services/user.service";

const log: debug.IDebugger = debug("app:users-controller");

class UserController {
  private static instance: UserController;

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async listUsers(req: Request, res: Response) {
    const users = await userService.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: Request, res: Response) {
    const user = await userService.readById(req.params.userId);
    res.status(200).send(user);
  }

  async createUser(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await userService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async patch(req: Request, res: Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await userService.patchById(req.body));
    res.status(204).send(``);
  }

  async put(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await userService.updateById({ id: req.params.userId, ...req.body }));
    res.status(204).send(``);
  }

  async removeUser(req: Request, res: Response) {
    log(await userService.deleteById(req.params.userId));
    res.status(204).send(``);
  }
}

export default UserController.getInstance();
