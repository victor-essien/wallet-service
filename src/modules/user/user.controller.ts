import { Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse } from "../../utils/response";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    return successResponse(res, user, "User created successfully");
  }

  async getUser(req: Request, res: Response) {
    const reqParams = req.params.id as string;
    const user = await userService.getUser(reqParams);
    return successResponse(req, user);
  }
}
