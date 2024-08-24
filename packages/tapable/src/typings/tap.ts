export type TapCallback<T extends any[] = any[]> = (...args: T) => void;

export interface Tap<T extends any[] = any[]> {
  name?: string;
  callback: TapCallback<T>;
}
