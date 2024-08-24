import { InterceptHook } from "./typings";

export class Intercept {
  hooks: Record<InterceptHook, Array<(...args: any[]) => any>> = {
    register: [],
    call: [],
    callAsync: [],
    tap: [],
  };

  register(hook: InterceptHook, callback: (...args: any[]) => any) {
    this.hooks[hook].push(callback);
  }

  emit(hook: InterceptHook, ...args: any[]) {
    this.hooks[hook].forEach((callback) => {
      callback(...args);
    });
  }
}

export default Intercept;
