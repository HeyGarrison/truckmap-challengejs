import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { SocketNextApiRequest } from "../../next-env";

const ioHandler = (req: NextApiRequest, res: SocketNextApiRequest) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");
      socket.on("chat", (msg) => {
        socket.emit("chat", msg);
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
