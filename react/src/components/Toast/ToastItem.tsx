import { useEffect } from "react";
import type { IToast, ToastType } from "./types";

function getIcon(type: ToastType) {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "info":
      return "ℹ️";
    case "warning":
      return "⚠️";
    default:
      return "✅";
  }
}

export default function ToastItem(props: {
  toast: IToast;
  removeToast: (id: string) => void;
}) {
  useEffect(() => {
    const timerIdRef = setTimeout(
      () => props.removeToast(props.toast.id),
      props.toast.config.duration,
    );
    return () => {
      clearTimeout(timerIdRef);
    };
  }, []);

  return (
    <div className={`toast ${props.toast.type}`}>
      <span>{getIcon(props.toast.type)}</span>
      <div>{props.toast.message}</div>
      {props.toast.config.closable && (
        <button onClick={() => props.removeToast(props.toast.id)}>x</button>
      )}
    </div>
  );
}
