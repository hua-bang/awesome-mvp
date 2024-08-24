import { AsyncSeriesBailHook } from "../../src";

const hook = new AsyncSeriesBailHook(["arg1"]);

hook.tap("event1", (arg1) => {
  console.log("event1", arg1);
  return Promise.resolve("花花");
});

hook.tap("event2", (arg1) => {
  console.log("event2", arg1);
});

hook.callAsync("value1").then(() => {
  console.log("done");
});
