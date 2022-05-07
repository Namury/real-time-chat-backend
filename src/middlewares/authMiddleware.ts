import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { response_unauthorized } from "$utils/response.utils";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>(
      jwt.verify(token, process.env.JWT_SECRET_TOKEN?.toString() || "")
    );
    res.locals.jwtPayload = jwtPayload;
  } catch (err: any) {
    return response_unauthorized(res, err.message);
  }

  next();
}