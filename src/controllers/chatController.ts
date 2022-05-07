import { Request, Response } from "express";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import {
  getRoomClientService,
  getRoomNameByUserIdService,
  getRoomNameByRoomUuidService,
  createRoomService,
  editRoomService,
  deleteRoomService,
} from "$services/chatService";

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

export async function getRoomNameByUserId(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = res.locals.jwtPayload.id;

  const { status, rooms, error } = await getRoomNameByUserIdService(userId);

  if (status) {
    return response_success(res, rooms);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getRoomNameByRoomUuid(
  req: Request,
  res: Response
): Promise<Response> {
  const roomUuid = req.params.roomUuid;

  const { status, room, error } = await getRoomNameByRoomUuidService(roomUuid);

  if (status) {
    return response_success(res, room);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function createRoom(
  req: Request,
  res: Response
): Promise<Response> {
  const { roomName } = req.body;
  const userId = res.locals.jwtPayload.id;

  const { status, room, error } = await createRoomService(roomName, userId);

  if (status) {
    return response_success(res, room);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editRoom(req: Request, res: Response): Promise<Response> {
  const { roomName } = req.body;
  const roomUuid = req.params.roomUuid

  const { status, room, error } = await editRoomService(roomUuid, roomName);

  if (status) {
    return response_success(res, room);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteRoom(
  req: Request,
  res: Response
): Promise<Response> {
  const roomUuid = req.params.roomUuid;

  const { status, room, error } = await deleteRoomService(roomUuid);

  if (status) {
    return response_success(res, room);
  } else {
    return response_internal_server_error(res, error);
  }
}
