import { SyncBailHook } from "../../src/index";

const hook = new SyncBailHook(["arg1", 2]);

hook.tap("event1", (...args) => {
  console.log("event1", ...args);
});

hook.tap("event2", (...args) => {
  console.log("event2", ...args);
  // return 123;
});

hook.tap("event3", (...args) => {
  console.log("event3", ...args); // 不会执行，因为前面的已经调用过了
});

hook.call("hua hua");
