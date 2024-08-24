import { AsyncParallelHook } from "../../src";

const hook = new AsyncParallelHook(["arg1"]);
console.time("async parallel hook");

hook.intercept({
  register: (tap) => {
    console.log("register", tap);
  },
  call: (tap) => {
    console.log("call", tap);
  },
  callAsync: (tap) => {
    console.log("callAsync", tap);
  },
  tap: (tap) => {
    console.log("tap", tap);
  },
});

hook.tap("event1", (arg1) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
});

hook.tap("event2", (arg1) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
});

hook.callAsync("value1").then((res) => {
  console.timeEnd("async parallel hook");
});
