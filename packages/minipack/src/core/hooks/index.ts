import { SyncHook } from 'awesome_mvp_tapable';

export const minipackHooks = {
  start: new SyncHook<any[]>([]),
  config: new SyncHook<any[]>([]),
  emit: new SyncHook<any[]>([])
};

export default minipackHooks;