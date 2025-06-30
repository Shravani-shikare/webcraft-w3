import React, { useState } from "react";
import "./SimpleCalculator.css";

export default function SimpleCalculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "+",
    "0", ".", "AC", "-",
  ];

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={`btn ${
              isNaN(btn) && btn !== "." ? "operator" : "number"
            }`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
      <button className="enter-btn" onClick={() => handleClick("=")}>
        ENTER
      </button>
    </div>
  );
}
