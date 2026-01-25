import { useSyncExternalStore } from "react";
import type { IToast, ToastStore } from "./types";

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

function createToastStore() {
    const store = new Store<ToastStore>({
        config: { position: "top-right", defaultExpiryDuration: 200 },
        toasts: [],
    });
    return {
        useToast: function <S>(selector: (state: ToastStore) => S) {
            return useSyncExternalStore(store.subscribe.bind(store), () =>
                selector(store.getState()),
            );
        },
        setToast: (newToast: IToast) =>
            store.setState((prev) => ({
                ...prev,
                toasts: [...prev.toasts, newToast],
            })),
        removeToast: (toastId: string) =>
            store.setState((prev) => ({
                ...prev,
                toasts: prev.toasts.filter((t) => t.id !== toastId),
            })),
    };
}

export const { useToast, setToast, removeToast } = createToastStore();