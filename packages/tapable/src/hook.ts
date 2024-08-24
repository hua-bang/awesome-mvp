import Intercept from "./intercept";
import { Tap, TapCallback } from "./typings";
import { InterceptHook, InterceptOptions } from "./typings/intercept";

export abstract class Hook<T extends any[] = any[]> {
  protected taps: Array<Tap<T>> = [];
  protected interceptInstance: Intercept = new Intercept();

  constructor(args: T) {}

  tap(name: string, callback: TapCallback<T>) {
    const tap: Tap<T> = {
      name,
      fn: callback,
      callback: (...args) => {
        this.interceptInstance.emit("tap", ...args);
        return callback(...args);
      },
    };
    this.interceptInstance.emit("register", tap);
    this.taps.push(tap);
  }

  intercept(options: InterceptOptions) {
    if (!options) {
      return;
    }

    Object.keys(options).forEach((key) => {
      this.interceptInstance.register(
        key as InterceptHook,
        options[key as InterceptHook] as (...args: any[]) => any
      );
    });
  }

  call(...args: T) {
    this.interceptInstance.emit("call", ...args);
    return this._call(...args);
  }

  abstract _call(...args: T): any;

  callAsync(...args: T): Promise<any> {
    this.interceptInstance.emit("callAsync", ...args);
    return this._callAsync(...args);
  }
  abstract _callAsync(...args: T): Promise<any>;
}

export default Hook;
