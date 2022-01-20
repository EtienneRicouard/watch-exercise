import { ConcreteSubject } from '../observer';
import { WatchState } from './watch-state-interface';

export class Watch extends ConcreteSubject {
  private _hourOffset: number;
  private _minuteOffset: number;
  private _date: Date;
  private _state!: WatchState;
  private _lightMode: boolean;
  private _hourEditMode: boolean;
  private _minuteEditMode: boolean;

  constructor(hourOffset?: number, minuteOffset?: number) {
    super();
    this._hourOffset = hourOffset ?? 0;
    this._minuteOffset = minuteOffset ?? 0;
    this._date = new Date();
    this._lightMode = false;
    this._hourEditMode = false;
    this._minuteEditMode = false;
    this.refreshTime = this.refreshTime.bind(this);
    this.refreshTime();
    this.start();
  }

  increaseHours(): void {
    this._hourOffset++;
    this.refreshTime();
  }

  increaseMinutes(): void {
    this._minuteOffset++;
    this.refreshTime();
  }

  transitionTo(state: WatchState): void {
    this._state = state;
    this.state.setContext(this);
    this.notify();
  }

  get date() {
    return this._date;
  }

  get state() {
    return this._state;
  }

  get lightMode() {
    return this._lightMode;
  }

  set lightMode(newMode: boolean) {
    this._lightMode = newMode;
    this.notify();
  }

  get hourEditMode() {
    return this._hourEditMode;
  }

  set hourEditMode(newMode: boolean) {
    this._hourEditMode = newMode;
    this.notify();
  }

  get minuteEditMode() {
    return this._minuteEditMode;
  }

  set minuteEditMode(newMode: boolean) {
    this._minuteEditMode = newMode;
    this.notify();
  }

  private start(): void {
    setInterval(this.refreshTime, 1000);
  }

  private refreshTime(): void {
    this._date = new Date();
    this._date.setHours((this._date.getHours() + this._hourOffset) % 24);
    this._date.setMinutes((this._date.getMinutes() + this._minuteOffset) % 60);
    this.notify();
  }

}