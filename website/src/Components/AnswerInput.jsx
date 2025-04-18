import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function AnswerInput({ n, ml, handleChange }) {
  const [val, setVal] = useState("");

  return (
    <div className="flex flex-row items-center gap-x-[1em] my-[5px]">
      <div className="text-xl text-bold" style={{ marginLeft: n >= 10 ? `${ml}px`:0}}>
        {n}
      </div>

      <TextField
        type="number"
        value={val}
        onChange={(e) => {
          let v = e.target.value;
          
          if (v.length <= 3 && v >= 0)
            setVal(v);
            handleChange(n)(v);
        }}
        sx={{
          height: "2rem",
          marginLeft: "10px",
          "& .MuiInputBase-root": {
            fontSize: "1.25rem", 
            height: "100%",
            width: "150px" 
          },
          "& .MuiInputBase-input": {
            textAlign: "center",
            appearance: "textfield",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
        }}
      />
    </div>
  );
}
