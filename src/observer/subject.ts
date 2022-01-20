import { Observer } from './observer';

export interface Subject {
  // Attach an observer to the subject.
  attach(observer: Observer): void;

  // Detach an observer from the subject.
  detach(observer: Observer): void;

  // Notify all observers about an event.
  notify(): void;
}

export class ConcreteSubject {
  private observers: Observer[] = [];

  // Attach a new observer
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  // Detach an existing observer
  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  // Notify all observers
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}