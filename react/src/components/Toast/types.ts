export type ToastType = "success" | "error" | "warning" | "info";
export interface AlertConfig {
    duration: number;
    closable: boolean;
}
export interface IToast {
    id: string;
    message: string;
    type: ToastType;
    config: AlertConfig;
}
export interface ToasterProps {
    defaultExpiryDuration?: number;
    position?:
    | "top-center"
    | "top-right"
    | "top-left"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export type ToastStore = {
    config: ToasterProps;
    toasts: IToast[];
}
