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
  let isFirstOccurrence = true;

  Object.keys(answer_types).forEach((key, index) => {
    const questionNumber = index;
    const answerValue = answers.data[key];
    const displayValue = answerValue === "-1" ? "" : answerValue || "";


    if (answer_types[key] === "input")
      answer_rows.push(
        <AnswerInput
          key={index}
          n={index + 1}
          ml={-10}
          handleChange={handleChange}
          value={displayValue}
        />
      );
    if (answer_types[key] === "choose")
      if (isFirstOccurrence){
        answer_rows.push(
          <div className="flex flex-row items-end gap-x-[1em]">
            <div className="text-xl text-b pb-[9px]">{index+1}</div>
            <RadioGroup name="q1" onChange={handleChangeChoose(1)} row
              sx={{
                "& .MuiTypography-root": {
                  fontSize: ".7rem",
                  color: "#494949"
                },
              }}
            >
              <FormControlLabel
                sx={{ margin: "0" }}
                value="1"
                control={<Radio />}
                labelPlacement="top"
                label="1"
              />
              <FormControlLabel
                sx={{ margin: "0" }}
                value="2"
                control={<Radio />}
                labelPlacement="top"
                label="2"
              />
              <FormControlLabel
                sx={{ margin: "0" }}
                value="3"
                control={<Radio />}
                labelPlacement="top"
                label="3"
              />
              <FormControlLabel
                sx={{ margin: "0" }}
                value="4"
                control={<Radio />}
                labelPlacement="top"
                label="4"
              />
            </RadioGroup>
          </div>

        )
        isFirstOccurrence = false
      }

      else
        answer_rows.push(
          <AnswerChoose
            key={index}
            n={index + 1}
            ml={-10}
            v={answers.data[key]}
            handleChange={handleChangeChoose}
          />
        );
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
