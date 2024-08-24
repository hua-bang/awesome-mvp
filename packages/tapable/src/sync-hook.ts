import Hook from "./hook";

export class SyncHook<T extends any[] = any[]> extends Hook<T> {
  _call(...args: T): void {
    this.taps.forEach((tap) => {
      tap.callback(...args);
    });
  }

  _callAsync(...args: T): Promise<void> {
    throw new Error("SyncHook.callAsync is not implemented");
  }
}

export default SyncHook;
