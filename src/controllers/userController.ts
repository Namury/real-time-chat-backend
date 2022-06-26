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
import jwt from "jsonwebtoken";
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

export async function verify(req: Request, res: Response) {
  const token = <string>req.headers.authorization;

  let jwtPayload;

  try {
    jwtPayload = <any>(
      jwt.verify(token.substring(7), process.env.JWT_SECRET_TOKEN?.toString() || "")
    );
    res.locals.jwtPayload = jwtPayload;
    return response_success(res)
  } catch (err: any) {
    return response_unauthorized(res, err.message);
  }
}
