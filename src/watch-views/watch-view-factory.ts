import { BasicWatchView } from './basic-watch-view';
import { ClockView } from './clock-view';
import { WatchButtonController, WatchView } from './watch-view';

export interface WatchViewSpecifier {
  parentElement: HTMLElement;
  lightController: WatchButtonController;
  increaseController: WatchButtonController;
  modeController: WatchButtonController;
  type?: string;
}

export class WatchViewFactory {
  private static instance: WatchViewFactory;
  private constructor() {
    // Nothing to do
  }

  public static getInstance(): WatchViewFactory {
    if (!WatchViewFactory.instance) {
      WatchViewFactory.instance = new WatchViewFactory();
    }
    return WatchViewFactory.instance;
  }

  create(specifier: WatchViewSpecifier): WatchView {
    switch(specifier.type) {
    case 'clock':
      return new ClockView(specifier.parentElement,
        specifier.lightController,
        specifier.increaseController,
        specifier.modeController);
    case 'basic':
    default:
      return new BasicWatchView(specifier.parentElement,
        specifier.lightController,
        specifier.increaseController,
        specifier.modeController);
    }
  }
}