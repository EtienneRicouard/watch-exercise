import { Watch } from '../watch-model';
import { AbstractWatchView } from './abstract-watch-view';
import { WatchButtonController } from './watch-view';
import './basic-watch-view.css';

export class BasicWatchView extends AbstractWatchView {
  private watchElement = document.createElement('div');
  private hourSpan = document.createElement('span');
  private separator1 = document.createElement('span');
  private minuteSpan = document.createElement('span');
  private separator2 = document.createElement('span');
  private secondSpan = document.createElement('span');
  constructor(parentElement: HTMLElement,
    lightController: WatchButtonController,
    increaseController: WatchButtonController,
    modeController: WatchButtonController,
  ) {
    super(parentElement, lightController, increaseController, modeController);
    this.init();
  }

  render(watch: Watch): void {
    this.hourSpan.innerHTML = `${watch.date.getHours() < 10 ? '0' : ''}${watch.date.getHours()}`;
    this.minuteSpan.innerHTML = `${watch.date.getMinutes() < 10 ? '0' : ''}${watch.date.getMinutes()}`;
    this.secondSpan.innerHTML = `${watch.date.getSeconds() < 10 ? '0' : ''}${watch.date.getSeconds()}`;
    if (watch.hourEditMode) {
      this.hourSpan.classList.add('blink');
    }
    else {
      this.hourSpan.classList.remove('blink');
    }

    if (watch.minuteEditMode) {
      this.minuteSpan.classList.add('blink');
    }
    else {
      this.minuteSpan.classList.remove('blink');
    }

    if (watch.lightMode) {
      this.watchElement.classList.add('lights-on');
    }
    else {
      this.watchElement.classList.remove('lights-on');
    }
  }

  protected init(): void {
    this.watchDiv.classList.add('basic-watch');
    this.watchDiv.appendChild(this.watchElement);
    this.watchDiv.appendChild(this.lightElement);
    this.watchDiv.appendChild(this.increaseElement);
    this.watchDiv.appendChild(this.modeElement);
    this.watchElement.appendChild(this.hourSpan);
    this.separator1.innerHTML = ':';
    this.watchElement.appendChild(this.separator1);
    this.watchElement.appendChild(this.minuteSpan);
    this.separator2.innerHTML = ':';
    this.watchElement.appendChild(this.separator2);
    this.watchElement.appendChild(this.secondSpan);
    this.lightElement.innerHTML = 'Lights';
    this.increaseElement.innerHTML = '+';
    this.modeElement.innerHTML = 'Mode';
  }
}