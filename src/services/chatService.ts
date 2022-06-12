import { SocketIOService } from "$utils/socketio.utils";
import { prisma } from "$utils/prisma.utils";

async function getRoomCount(rooms: string[]) {
  const io = SocketIOService.instance().getServer();

  let roomResult: Number[] = [];

  rooms.forEach(async (room) => {
    var sockets = await io.in(room).fetchSockets();
    var count = 0;
    sockets.forEach((socket) => {
      socket.rooms.forEach((roomCount) => {
        if (roomCount === room) {
          count++;
        }
      });
    });
    roomResult.push(count);
  });

  return roomResult;
}

export async function getRoomClientService() {
  try {
    const rooms = ["room1", "room2", "room3", "room4", "room5", "room6"];
    var roomList: Number[] = await getRoomCount(rooms);

    return { status: true, roomList: roomList };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function getRoomNameByUserIdService(userId:number) {
  try {
    const rooms = await prisma.room.findMany({
      where:{
        userId
      }
    })

    return { status: true, rooms: rooms };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function getRoomNameByRoomUuidService(roomUuid: string){
  try {
    const room = await prisma.room.findUnique({
      where:{
        uuid: roomUuid
      }
    })

    if(!room){
      return { status: false, error: "Room Not Found" };
    }

    return { status: true, room: room };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function createRoomService(roomName: string, userId: number) {
  try {
    const findRoom = await prisma.room.findFirst({
      where: {
        userId,
        name: roomName,
      },
    });

    if (findRoom) {
      return { status: false, error: "Room Already Exist" };
    }

    const createdRoom = await prisma.room.create({
      data: {
        name: roomName,
        userId,
      },
    });

    return { status: true, room: createdRoom };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function editRoomService(roomUuid:string, roomName: string) {
  try {
    const findRoom = await prisma.room.findUnique({
      where:{ uuid: roomUuid }
    })

    if(!findRoom){
      return { status: false, error: "Room Not Found" };
    }

    const findRoomName = await prisma.room.findFirst({
      where: {
        name: roomName,
      },
    });

    if (findRoomName && roomName !== findRoom.name) {
      return { status: false, error: "Room Name Already Exist" };
    }

    const editedRoom = await prisma.room.update({
      where: {
        uuid: roomUuid
      },
      data: {
        name: roomName,
      },
    });

    return { status: true, room: editedRoom };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function deleteRoomService(roomUuid: string) {
  try {
    const findRoom = await prisma.room.findFirst({
      where: {
        uuid: roomUuid,
      },
    });

    if (!findRoom) {
      return { status: false, error: "Room Not Found" };
    }

    const deletedRoom = await prisma.room.delete({
      where:{ uuid: roomUuid}
    })

    return { status: true, room: deletedRoom };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

