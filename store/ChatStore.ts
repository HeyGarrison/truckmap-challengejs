import { Store } from "pullstate";
import { Chat } from "../next-env";

interface IChatStore {
  chatList: Chat[];
}

export const ChatStore = new Store<IChatStore>({
  chatList: [],
});
