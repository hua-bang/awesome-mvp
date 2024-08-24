import Hook from "./hook";

export class AsyncSeriesBailHook<T extends any[] = []> extends Hook<T> {
  call(...args: T) {
    throw new Error("AsyncSeriesBailHook.call is not implemented");
  }

  async callAsync(...args: T): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      for (let i = 0; i < this.taps.length; i++) {
        try {
          const result = await this.taps[i].callback(...args);
          if (result !== undefined || i === this.taps.length - 1) {
            resolve();
            break;
          }
        } catch (err) {
          reject(err);
          break;
        }
      }
    });
  }
}

export default AsyncSeriesBailHook;
