import { Store } from "pullstate";

interface IUserStore {
  email: string | null;
}

export const UserStore = new Store<IUserStore>({
  email: null,
});
