import Hook from "./hook";

export class SyncLoopHook<T extends any[] = any[]> extends Hook<T> {
  _call(...args: T) {
    let shouldRerun = false;
    for (let i = 0; i < this.taps.length; i++) {
      const result = this.taps[i].callback(...args);
      if (result !== undefined) {
        shouldRerun = true;
        break;
      }
    }

    if (shouldRerun) {
      this.call(...args);
    }
  }

  _callAsync(...args: T): Promise<void> {
    throw new Error("SyncLoopHook.callAsync is not implemented");
  }
}
