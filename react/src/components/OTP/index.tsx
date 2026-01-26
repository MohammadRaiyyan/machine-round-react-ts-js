import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
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
      if (fields[index]) {
        const copiedFields = [...fields];
        copiedFields[index] = "";
        setFields(copiedFields);
      } else {
        inputRefs.current[index - 1]?.focus();
      }
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
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const copiedFields = [...fields];
    copiedFields[index] = val;
    setFields(copiedFields);
    if (val && index < fields.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
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
              onChange={(e) => handleChange(e, index)}
              aria-label={`input-${index + 1}`}
            />
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
