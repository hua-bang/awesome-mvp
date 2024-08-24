import { Tap } from "./tap";

export interface InterceptOptions {
  register?: (tapInfo: Tap) => void;

  call?: (...args: any[]) => void;

  callAsync?: (...args: any[]) => void;

  tap?: (tapInfo: Tap) => void;
}

export type InterceptHook = keyof InterceptOptions;
