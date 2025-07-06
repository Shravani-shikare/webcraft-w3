import React, { useState, useEffect } from "react";
import "./SimpleCalculator.css";

export default function SimpleCalculator() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
      setError(false);
      return;
    }

    if (value === "⌫") {
      if (error) {
        setInput("");
        setError(false);
      } else {
        setInput((prev) => prev.slice(0, -1));
      }
      return;
    }

    if (value === "=") {
      try {
        const result = Function(`return (${input})`)();
        setInput(result.toString());
        setError(false);
      } catch {
        setInput("Error");
        setError(true);
      }
      return;
    }

    if (error) {
      setInput(value);
      setError(false);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "/", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "*", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "AC", type: "action" },
    { label: "-", type: "operator" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (/^[0-9]$/.test(key) || key === ".") {
        handleClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleClick(key);
      } else if (key === "Enter" || key === "=") {
        handleClick("=");
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        handleClick("AC");
      } else if (key === "Backspace") {
        handleClick("⌫");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [error, input]);

  return (
    <div className="calculator">
      <div className={`display ${error ? "error" : ""}`} aria-label="Display">
        {input || "0"}
      </div>

      <div className="grid">
        {buttons.map(({ label, type }) => (
          <button
            key={label}
            className={`btn ${type}`}
            onClick={() => handleClick(label)}
            aria-label={`Button ${label}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bottom-buttons">
        <button
          className="btn enter-btn"
          onClick={() => handleClick("=")}
          aria-label="Calculate result"
        >
          ENTER
        </button>
        <button
          className="btn backspace-btn"
          onClick={() => handleClick("⌫")}
          aria-label="Backspace"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
