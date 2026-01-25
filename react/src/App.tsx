import "./App.css";
import NestedGoogleDriveFolder from "./components/NestedGoogleDriveFolder";
import { toast, Toaster } from "./components/Toast";

function App() {
  return (
    <div>
      <NestedGoogleDriveFolder />
      <button
        onClick={() =>
          toast.success("Account deleted successfully", {
            closable: true,
            duration: 5000,
          })
        }
      >
        Success
      </button>
      <button
        onClick={() =>
          toast.error("Account could not be deleted", {
            closable: true,
            duration: 5000,
          })
        }
      >
        Error
      </button>
      <button
        onClick={() =>
          toast.info("Please check the config before performing action", {
            closable: true,
            duration: 5000,
          })
        }
      >
        Info
      </button>
      <button
        onClick={() =>
          toast.warning("This is some warning message", {
            closable: true,
            duration: 5000,
          })
        }
      >
        Warning
      </button>
      <Toaster />
    </div>
  );
}

export default App;
