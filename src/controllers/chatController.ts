import { Request, Response } from "express";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { chatService } from "$services/chatService";

export async function getAllRootCourseByGrade(
  req: Request,
  res: Response
): Promise<Response> {
  const { status, error, courses } = await chatService();

  if (!status) {
    response_internal_server_error(res, error);
  }

  return response_success(res, { courses });
}
