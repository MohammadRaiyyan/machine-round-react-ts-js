import { setToast } from "./Store";
import type { AlertConfig, ToastType } from "./types";

class ToastService {
    private create(message: string, type: ToastType, config: AlertConfig) {
        setToast({ type, config, message, id: crypto.randomUUID() });
    }
    success(message: string, config: AlertConfig) {
        this.create(message, "success", config);
    }
    error(message: string, config: AlertConfig) {
        this.create(message, "error", config);
    }
    warning(message: string, config: AlertConfig) {
        this.create(message, "warning", config);
    }
    info(message: string, config: AlertConfig) {
        this.create(message, "info", config);
    }
}
export const toast = new ToastService();