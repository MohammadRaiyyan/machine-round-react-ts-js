import { useSyncExternalStore } from "react";
import { Store } from "../store";
import type { FormState } from "./types";

export default function useFormStore<T>(initialValues: T) {
  const store = new Store<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
  });
  return {
    subscribe: function <S>(selector: (state: FormState<T>) => S) {
      return useSyncExternalStore(store.subscribe.bind(store), () =>
        selector(store.getState()),
      );
    },
    setState: store.setState.bind(store),
    getState: store.getState.bind(store),
    reset: store.reset.bind(store),
  };
}
