import Hook from "./hook";

export class AsyncSeriesWaterfallHook<T extends any[] = []> extends Hook<T> {
  call(...args: T) {
    throw new Error("AsyncSeriesBailHook.call is not implemented");
  }

  async callAsync(...args: T): Promise<any> {
    let [result, ...restArgs] = args;
    return new Promise<void>(async (resolve, reject) => {
      for (let i = 0; i < this.taps.length; i++) {
        try {
          const execResult = await this.taps[i].callback(
            ...([result, ...restArgs] as T)
          );
          if (execResult !== undefined) {
            result = execResult;
          }

          if (i === this.taps.length - 1) {
            resolve(result);
          }
        } catch (err) {
          reject(err);
          break;
        }
      }
    });
  }
}

export default AsyncSeriesWaterfallHook;
