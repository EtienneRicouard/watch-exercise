import { Watch } from './watch-model/watch';
import { WatchStateIdle } from './watch-model/watch-states';
import { WatchViewFactory } from './watch-views/watch-view-factory';

const watch = new Watch();
const watchState = new WatchStateIdle(watch);
watch.transitionTo(watchState);
const lightController = {
  execute: () => watch.state.lightClicked(),
};
const increaseController = {
  execute: () => watch.state.increaseClicked(),
};
const modeController = {
  execute: () => watch.state.modeClicked(),
};

const body  = document.querySelector('body');
if (body) {
  const basicDisplay = WatchViewFactory.getInstance().create({
    parentElement: body,
    lightController,
    increaseController,
    modeController,
    type: 'basic',
  });
  watch.attach(basicDisplay);

  const clockDisplay = WatchViewFactory.getInstance().create({
    parentElement: body,
    lightController,
    increaseController,
    modeController,
    type: 'clock',
  });
  watch.attach(clockDisplay);
  // Trigger first display
  watch.notify();
}
