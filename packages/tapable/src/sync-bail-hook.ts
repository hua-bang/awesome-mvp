import Hook from "./hook";

export class SyncBailHook<T extends any[] = any[]> extends Hook<T> {
  _call(...args: T) {
    let result: any = undefined;

    for (let i = 0; i < this.taps.length; i++) {
      result = this.taps[i].callback(...args);
      if (result !== undefined) {
        break;
      }
    }
  }

  _callAsync(...args: T): Promise<any> {
    throw new Error("SyncBailHook.callAsync is not implemented");
  }
}
