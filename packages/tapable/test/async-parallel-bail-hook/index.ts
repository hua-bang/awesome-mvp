import { AsyncParallelBailHook } from "../../src";

const hook = new AsyncParallelBailHook(["arg1"]);
console.time("async parallel hook");

hook.tap("event1", (arg1) => {
  return new Promise<void>((resolve) => {
    console.log("event1", arg1);
    setTimeout(() => {
      resolve();
    }, 2000);
  });
});

hook.tap("event2", (arg1) => {
  console.log("event2", arg1);
  return new Promise<number | void>((resolve) => {
    setTimeout(() => {
      // resolve(123);
      resolve();
    }, 1000);
  });
});

hook.callAsync("value1").then((res) => {
  console.log("all done");
  console.timeEnd("async parallel hook");
});
