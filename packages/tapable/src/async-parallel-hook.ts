import Hook from "./hook";

export class AsyncParallelHook<T extends any[] = []> extends Hook<T> {
  call(...args: T) {
    throw new Error("AsyncSeriesHook.call is not implemented");
  }

  async callAsync(...args: T): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const promises: Array<Promise<void>> = this.taps.map(async (tap) => {
        try {
          await tap.callback(...args);
        } catch (err) {
          reject(err);
        }
      });

      return Promise.all(promises).then((res) => {
        resolve();
      });
    });
  }
}

export default AsyncParallelHook;
