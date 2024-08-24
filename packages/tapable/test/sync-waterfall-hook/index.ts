import { SyncWaterfallHook } from "../../src";

const hook = new SyncWaterfallHook(["author", "age"] as any) as any;

hook.tap("event1", (author: any, age: any) => {
  console.log("event1", author, age);
});

hook.tap("event2", (author: any, age: any) => {
  console.log("event2", author, age);

  return "华铧";
});

hook.tap("event3", (author: any, age: any) => {
  console.log("event3", author, age);
});

hook.call("hua hua", 18);
