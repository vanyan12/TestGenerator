import React, { useRef, useState } from "react";
import { TextField, Box } from "@mui/material";

const Input = () => {
  const inputsRef = useRef([]);
  const [values, setValues] = useState(["", "", ""]); // State to store the values of the inputs

  const handleChange = (index, event) => {
    const value = event.target.value;

    // Allow only one digit
    if (value.length > 1) {
      return;
    }

    // Update the state with the new value
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Move to the next input field
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      const newValues = [...values];

      // If the current input is not empty, clear it
      if (newValues[index]) {
        newValues[index] = "";
      } else {
        // If the current input is already empty, shift subsequent values to the left
        for (let i = index; i < newValues.length - 1; i++) {
          newValues[i] = newValues[i + 1];
        }
        newValues[newValues.length - 1] = ""; // Add an empty value at the end

        // Move focus to the previous input if the current one becomes empty
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      }

      setValues(newValues);
    }
  };

  return (
    <Box display="flex" gap={2} justifyContent="center">
      {values.map((value, index) => (
        <TextField
          key={index}
          type="number"
          inputRef={(el) => (inputsRef.current[index] = el)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "24px", width: "50px" },
          }}
        />
      ))}
    </Box>
  );
};

export default Input;
