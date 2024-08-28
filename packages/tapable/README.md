# Tapable

Just a little module for plugins.


## usage

```ts
import { SyncHook } from "../../src/index";

const hook = new SyncHook(["arg1"]);

hook.tap("event1", (...args) => {
  console.log("event1", ...args);
});

hook.tap("event2", (...args) => {
  console.log("event2", ...args);
});

hook.call("hua hua");
```
