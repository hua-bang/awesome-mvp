import { SyncHook } from "./sync-hook";
import { SyncBailHook } from "./sync-bail-hook";
import { SyncWaterfallHook } from "./sync-waterfall-hook";
import { SyncLoopHook } from "./sync-loop-hook";
import { AsyncSeriesHook } from "./async-series-hook";
import { AsyncSeriesBailHook } from "./async-series-bail-hook";
import { AsyncSeriesWaterfallHook } from "./async-series-waterfall-hook";
import { AsyncParallelHook } from "./async-parallel-hook";
import { AsyncParallelBailHook } from "./async-parallel-bail-hook";

export {
  // 同步
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  // 异步串行
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
  // 异步并行
  AsyncParallelHook,
  AsyncParallelBailHook,
};
