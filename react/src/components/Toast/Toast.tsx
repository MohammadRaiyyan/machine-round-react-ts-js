import { removeToast, useToast } from "./Store";
import "./style.css";
import ToastItem from "./ToastItem";
import type { ToasterProps } from "./types";

function Toaster(props: ToasterProps) {
  const toasts = useToast((prev) => prev.toasts);
  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        return (
          <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
        );
      })}
    </div>
  );
}

export default Toaster;
