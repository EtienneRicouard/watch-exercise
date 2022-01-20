import { Watch } from './watch';
import { WatchState } from './watch-state-interface';

export class WatchStateIdle extends WatchState {
  constructor(private readonly watch: Watch) {
    super();
    this.watch.minuteEditMode = false;
    this.watch.hourEditMode = false;
  }
  lightClicked(): void {
    this.watch.lightMode = !this.watch.lightMode;
  }
  modeClicked(): void {
    this.context.transitionTo(new WatchStateHours(this.watch));
  }
  increaseClicked(): void {
    console.log('Nothing to do');
  }
}

export class WatchStateHours extends WatchState {
  constructor(private readonly watch: Watch) {
    super();
    this.watch.minuteEditMode = false;
    this.watch.hourEditMode = true;
  }
  lightClicked(): void {
    this.watch.lightMode = !this.watch.lightMode;
  }
  modeClicked(): void {
    this.context.transitionTo(new WatchStateMinutes(this.watch));
  }
  increaseClicked(): void {
    this.watch.increaseHours();
  }
}

export class WatchStateMinutes extends WatchState {
  constructor(private readonly watch: Watch) {
    super();
    this.watch.hourEditMode = false;
    this.watch.minuteEditMode = true;
  }
  lightClicked(): void {
    this.watch.lightMode = !this.watch.lightMode;
  }
  modeClicked(): void {
    this.context.transitionTo(new WatchStateIdle(this.watch));
  }
  increaseClicked(): void {
    this.watch.increaseMinutes();
  }
}