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

  abstract call(...args: T): any;
  abstract callAsync(...args: T): Promise<any>;
}

export default Hook;
