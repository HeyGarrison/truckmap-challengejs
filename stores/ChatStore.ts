import { Store } from "pullstate";
import { Socket } from "socket.io-client";

interface Chat {}

interface User {}

interface ChatStoreInterface {
  socket: Socket;
  chats: Chat[];
  users: User[];
}

export const ChatStore = new Store<ChatStoreInterface>({
  socket: null,
  chats: [],
  users: [],
});
