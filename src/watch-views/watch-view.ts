import { Observer } from '../observer';
import { Watch } from '../watch-model';

/**
 * WatchView
 */
export interface WatchView extends Observer {
  render: (watch: Watch) => void;
}

/**
 * WatchButtonController
 */
export interface WatchButtonController {
  execute: () => void;
}