import { Store } from "pullstate";

interface IOnlineListStore {
  data: {};
  isOpen: boolean;
}

export const OnlineListStore = new Store<IOnlineListStore>({
  data: {},
  isOpen: false,
});
