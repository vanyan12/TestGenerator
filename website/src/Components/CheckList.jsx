import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import AnswerChoose from "./AnswerChoose";
import AnswerInput from "./AnswerInput";
import { RadioGroup } from "@mui/material";

export default function CheckList({answers, answer_types, handleChange, handleChangeChoose}) {


  const answer_rows = [];
  let isFirstOccurrenceChoose = true;
  let isFirstOccurrenceTF = true;

  const choices = {
    choose: ["1", "2", "3", "4"],
    tf: ["Ճիշտ", "Սխալ", "Չգիտեմ"],
  }

  Object.keys(answer_types).forEach((key, index) => {
    const qNum = index + 1;
    const type = answer_types[key];
    const answerValue = answers.data[key];
    const displayValue = answerValue === "-1" ? "" : answerValue || "";


    if (type === "input") {
      answer_rows.push(
        <AnswerInput
          key={index}
          n={qNum}
          ml={-10}
          handleChange={handleChange}
          value={displayValue}
        />
      );
    } else if (type === "tf" || type === "choose") {
        const isFirst = type === "choose" ? isFirstOccurrenceChoose : isFirstOccurrenceTF;

        if (isFirst) {
          answer_rows.push(
            <div key={`group-${qNum}`} className="flex flex-row items-end gap-x-[1em]">
              <div className="text-xl text-b">{qNum}</div>

              <RadioGroup 
                name={`q${qNum}`}
                value={(() => {
                  if (type === "tf" && answerValue === "-1") return "-1";
                  return answerValue || "";
                })()}
                onChange={(e) => handleChange(qNum)(e.target.value)} 
                row
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: ".7rem",
                    color: "#494949"
                  },
                  '& .MuiRadio-root': {
                    padding: '2px',
                    fontSize: '0.7rem',
                  },
                  ...(type === "tf" && {
                      "& .MuiFormControlLabel-label": {
                        display: "inline-block",
                        marginTop: "0.5em",
                        transform: "rotate(330deg)",
                        transformOrigin: "50% 0%",
                      }
                    })
                }}
              >
                {choices[type].map((choice, idx) => {

                  // Convert "Ճիշտ", "Սխալ", "Չգիտեմ" to "1", "0", "-1"
                  const val = choice === "Ճիշտ" ? "1"
                            : choice === "Սխալ" ? "0"
                            : choice === "Չգիտեմ" ? "-1"
                            : choice;

                  return (
                    <FormControlLabel
                      key={`radio-${qNum}-${idx}`}
                      sx={{ margin: "0"}}
                      value={val}
                      control={<Radio />}
                      labelPlacement="top"
                      label={choice}
                    />
                  );
                })}
              </RadioGroup>
            </div>
          );

          if (type === "choose") isFirstOccurrenceChoose = false;
          else isFirstOccurrenceTF = false;
        
        } else {
          answer_rows.push(
            <AnswerChoose
              key={`radio-${qNum}`}
              n={qNum}
              ml={-10}
              v={answerValue}
              handleChange={handleChangeChoose}
              options={choices[type]}
            />
          );
        }
    }

  });






  return (
    <React.Fragment>
        <DialogContent
          dividers={scroll === "paper"}
          className="flex flex-row justify-center "
          sx={{
            "& .MuiDialogContent-root": {
              overflow: "hidden",
            },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          
        <div className="flex flex-wrap flex-col gap-x-[3em] h-screen">
            {answer_rows}
        </div>
          
        </DialogContent>
    </React.Fragment>
  );
}
