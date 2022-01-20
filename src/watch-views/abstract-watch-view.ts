import { Watch } from '../watch-model';
import { WatchButtonController, WatchView } from './watch-view';

export abstract class AbstractWatchView implements WatchView {
  protected readonly watchDiv = document.createElement('div');
  protected readonly lightElement = document.createElement('button');
  protected readonly increaseElement = document.createElement('button');
  protected readonly modeElement = document.createElement('button');
  constructor(private readonly parentElement: HTMLElement,
    lightController: WatchButtonController,
    increaseController: WatchButtonController,
    modeController: WatchButtonController,
  ) {
    this.watchDiv = document.createElement('div');
    this.parentElement.appendChild(this.watchDiv);

    this.lightElement.addEventListener('click', lightController.execute);
    this.increaseElement.addEventListener('click', increaseController.execute);
    this.modeElement.addEventListener('click', modeController.execute);
  }

  update(subject: Watch): void {
    this.render(subject);
  }

  protected abstract init(): void;
  abstract render(watch: Watch): void;
}