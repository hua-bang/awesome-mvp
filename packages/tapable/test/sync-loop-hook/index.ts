import { SyncLoopHook } from "../../src";

const hook = new SyncLoopHook(["arg1"]);

let count1 = 0;
let count2 = 0;

hook.tap("event1", (...args) => {
  console.log("event1", ...args);
  if (count1 !== 3) {
    return count1++;
  }
});

hook.tap("event2", (...args) => {
  console.log("event2", ...args);
  if (count2 !== 3) {
    return count2++;
  }
});

hook.tap("event3", (...args) => {
  console.log("event3", ...args);
});

hook.tap("event4", (...args) => {
  console.log("event4", ...args);
});

hook.call("hua hua");
