import {
  userLoginService,
  userRegisterService,
} from "$services/userServices";
import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<Response> {
  const { name, error } = req.body;
  const { status, userDetails } = await userLoginService(name);
  if (status) {
    return response_success(res, userDetails);
  } else {
    return response_unauthorized(res, error);
  }
}

export async function register(req: Request, res: Response) {
  const { user, status, token, error, school } =
    await userRegisterService(req.body);

  if (status) {
    return response_success(res, { user, token, school });
  } else {
    return response_internal_server_error(res, error);
  }
}