import { SocketIOService } from "$utils/socketio.utils";

const io = SocketIOService.instance();

export async function getRoomClient() {
  try {
    const rooms = io.getServer();
    console.log(rooms);
    return { status: true, courses: rooms };
  } catch (err: any) {
    return { status: false, error: err };
  }
}
