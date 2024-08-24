import Hook from "./hook";

export class AsyncParallelBailHook<T extends any[] = []> extends Hook<T> {
  call(...args: T) {
    throw new Error("AsyncSeriesHook.call is not implemented");
  }

  async callAsync(...args: T): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const promises = this.taps.map(async (tap) => {
        try {
          const result = await tap.callback(...args);
          if (result !== undefined) {
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      });

      return Promise.all(promises).then(() => {
        resolve();
      });
    });
  }
}

export default AsyncParallelBailHook;
