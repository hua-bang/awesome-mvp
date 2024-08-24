import Hook from "./hook";

export class SyncWaterfallHook<T extends any[] = any[]> extends Hook<T> {
  call(...args: T) {
    let [result, ...restArgs] = args;
    this.taps.forEach((tap) => {
      const execRes = tap.callback(...([result, ...restArgs] as unknown as T));
      if (execRes !== undefined) {
        result = execRes;
      }
    });
  }

  callAsync(...args: T): Promise<any> {
    throw new Error("SyncWaterFallHook.callAsync is not implemented");
  }
}

export default SyncWaterfallHook;
