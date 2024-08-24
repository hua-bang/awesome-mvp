import { AsyncSeriesWaterfallHook } from "../../src";

const hook = new AsyncSeriesWaterfallHook(["arg1", 12]);

hook.tap("plugin1", (str, age) => {
  console.log(str, age);
  return Promise.resolve(str + " from plugin1");
});

hook.tap("plugin2", (str, age) => {
  console.log(str, age);
  return Promise.resolve(str + " from plugin2");
});

hook.callAsync("start", 13).then((result) => {
  console.log(result); // 输出: "start from plugin1 from plugin2"
});
