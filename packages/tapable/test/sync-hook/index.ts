import { SyncHook } from "../../src/index";

const hook = new SyncHook(["name"]);

hook.tap("tap1", (name) => {
  console.log("tap1", name);
});

hook.tap("tap2", (name) => {
  console.log("tap2", name);
});

hook.call("华铧");
