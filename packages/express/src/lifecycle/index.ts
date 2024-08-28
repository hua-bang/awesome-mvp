import { SyncHook } from 'awesome_mvp_tapable';

class Lifecycle {
  listened: SyncHook = new SyncHook([3000]);
}

export default Lifecycle;