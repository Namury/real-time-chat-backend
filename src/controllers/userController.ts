import {
  userLoginService,
  userRegisterService,
  editUserService,
} from "$services/userServices";

import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<Response> {
  const { username, password } = req.body;
  const { status, user, error } = await userLoginService(username, password);

  if (status) {
    return response_success(res, user);
  } else {
    return response_unauthorized(res, error);
  }
}

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;

  const { status, user, error } = await userRegisterService({
    username,
    password,
  });

  if (status) {
    return response_success(res, user);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editUser(req: Request, res: Response) {
  const { username } = req.body;
  const userUuid = req.params.userUuid
  const oldUsername = res.locals.jwtPayload.username;
  
  const { status, user, error } = await editUserService(userUuid, username, oldUsername);

  if (status) {
    return response_success(res, user);
  } else {
    return response_internal_server_error(res, error);
  }
}
