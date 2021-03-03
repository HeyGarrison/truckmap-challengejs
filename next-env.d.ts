/// <reference types="next" />
/// <reference types="next/types/global" />

import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { Socket } from "socket.io";

interface LayoutPage extends NextPage {
  getLayout?: (component: JSX.Element) => JSX.Element;
}

interface SocketNextApiResponse extends NextApiResponse {
  socket: {
    server: Server;
  };
}

interface Chat {
  email: string;
  text: string;
  createdAt: string;
}
