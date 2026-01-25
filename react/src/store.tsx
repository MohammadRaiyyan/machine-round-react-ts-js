export class Store<T> {
  private state: T;
  private listeners: Set<VoidFunction>;
  private initialState: T;

  constructor(state: T) {
    this.state = state;
    this.initialState = state;
    this.listeners = new Set<() => void>();
  }

  getState() {
    return this.state;
  }

  setState(updater: (prev: T) => T) {
    this.state = updater(this.state);
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  reset() {
    this.state = this.initialState;
    this.listeners.forEach((l) => l());
  }
}
