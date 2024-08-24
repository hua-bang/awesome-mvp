import { Tap, TapCallback } from "./typings";

export abstract class Hook<T extends any[] = any[]> {
  protected taps: Array<Tap<T>> = [];

  constructor(args: T) {}

  tap(name: string, callback: TapCallback<T>) {
    this.taps.push({
      name,
      callback,
    });
  }

  call(...args: T) {
    return this._call(...args);
  }

  abstract _call(...args: T): any;

  callAsync(...args: T): Promise<any> {
    return this._callAsync(...args);
  }
  abstract _callAsync(...args: T): Promise<any>;
}

export default Hook;
