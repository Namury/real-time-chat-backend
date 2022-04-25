import { Request, Response } from "express";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { getRoomClientService } from "$services/chatService";

export async function getRoomClient(
  req: Request,
  res: Response
): Promise<Response> {
  const { status, error, roomList } = await getRoomClientService();

  if (!status) {
    response_internal_server_error(res, error);
  }

  return response_success(res, roomList);
}
