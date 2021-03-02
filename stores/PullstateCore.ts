import { createPullstateCore } from "pullstate";
import { ChatStore } from "./ChatStore";

export const PullstateCore = createPullstateCore({
  ChatStore,
});
