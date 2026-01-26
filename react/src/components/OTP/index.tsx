import { useRef, useState, type KeyboardEvent } from "react";
import "./style.css";
interface OTPProps {
  length?: number;
}
export default function OTP({ length = 6 }: OTPProps) {
  const [fields, setFields] = useState<Array<string>>(
    new Array(length).fill(""),
  );

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const key = e.key;

    if (key === "Backspace") {
      const copiedFields = [...fields];
      copiedFields[index] = "";
      setFields(copiedFields);
      inputRefs.current[index - 1]?.focus();
      return;
    }
    if (key === "ArrowLeft") {
      inputRefs.current[index - 1]?.focus();
      return;
    }
    if (key === "ArrowRight") {
      inputRefs.current[index + 1]?.focus();
      return;
    }
    if (isNaN(Number(key))) {
      return;
    }

    const copiedFields = [...fields];
    copiedFields[index] = key;
    setFields(copiedFields);
    inputRefs.current[index + 1]?.focus();
  };
  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submiting");
        }}
      >
        <div className="container">
          {fields.map((field, index) => (
            <input
              type="text"
              value={field}
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`input-${index + 1}`}
            />
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
