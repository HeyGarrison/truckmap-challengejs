import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";
import { SocketNextApiResponse } from "../../next-env";

let onlineUserList = {};
const ioHandler = (req: NextApiRequest, res: SocketNextApiResponse) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket: Socket) => {
      socket.on("chat", (msg) => {
        socket.emit("chat", msg);
      });

      socket.on("online-user", (email) => {
        onlineUserList[email] = "online";
        socket.emit("online-user", onlineUserList);
      });

      socket.on("disconnect", () => {
        delete onlineUserList[socket.id];
        socket.emit("offline-user", onlineUserList);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
