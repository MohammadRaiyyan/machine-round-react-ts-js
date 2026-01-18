import { useState, type ChangeEvent } from "react";
import useDebounce from "./useDebounce";

function UseDebounceHookDemo() {
  const [state, setState] = useState("");
  const handleDebounce = useDebounce({
    callbackFn: (s: string) => {
      console.log("Running", s);
    },
    delay: 500,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
    handleDebounce(state);
  };
  return (
    <div>
      <h2>UseDebounceHook Demo</h2>
      <input value={state} onChange={handleChange} />
    </div>
  );
}

export default UseDebounceHookDemo;
