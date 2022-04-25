import { SocketIOService } from "$utils/socketio.utils";

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
