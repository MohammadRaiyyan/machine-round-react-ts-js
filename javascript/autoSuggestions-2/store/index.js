const store = {
  query: "",
  suggestions: [],
  loading: false,
  error: null,
  activeIndex: -1,
};

const listeners = new Set();
export function getState() {
  return structuredClone(store);
}

export function setState(patch) {
  Object.assign(store, patch);
  listeners.forEach((li) => li(getState()));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
