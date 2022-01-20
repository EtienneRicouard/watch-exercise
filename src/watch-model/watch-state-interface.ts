import { Watch } from './watch';

/**
 * WatchState
 */
export abstract class WatchState {
  protected context!: Watch;

  public setContext(context: Watch): void {
    this.context = context;
  }

  abstract lightClicked(): void;
  abstract modeClicked(): void;
  abstract increaseClicked(): void;
}