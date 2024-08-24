import Hook from "./hook";

export class AsyncSeriesHook<T extends any[] = []> extends Hook<T> {
  call(...args: T) {
    throw new Error("AsyncSeriesHook.call is not implemented");
  }

  async callAsync(...args: T): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      for (let i = 0; i < this.taps.length; i++) {
        try {
          await this.taps[i].callback(...args);
          if (i === this.taps.length - 1) {
            resolve();
          }
        } catch (err) {
          reject(err);
          break;
        }
      }
    });
  }
}

export default AsyncSeriesHook;
