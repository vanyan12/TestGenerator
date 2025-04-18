import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import AnswerChoose from "./AnswerChoose";
import AnswerInput from "./AnswerInput";
import { RadioGroup } from "@mui/material";

export default function Modal({ open, setOpen, taskCount, answer_types }) {

  const empty_answers =  Array.from({ length: taskCount }, (_, i) => [i + 1, "-1"]).reduce(
    (acc, [id, val]) => {
      acc.data[id] = val;
      return acc;
    },
    { data: {} }
  )

  const [answers, setAnswers] = useState(empty_answers);

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showCheckButton, setCheckButton] = useState(true);

  const handleChange = (questionNumber) => (val) => {
    setAnswers((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [questionNumber]: val.length > 3 ? val.slice(0, 3) : val,
      },
    }));
  };

  const handleChangeChoose = (questionNumber) => (event) => {
    setAnswers((prev) => ({
      ...prev, // Spread the previous state
      data: {
        // Update only the "data" object
        ...prev.data,
        [questionNumber]: event.target.value, // Update the answer for the current question
      },
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const response = await fetch("https://apicontainer-auchgsfzcdaxdrdx.westeurope-01.azurewebsites.net/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers)
    })

    const data = await response.json()

    const score = data["score"]

    setScore(score);

    setShowScore(true);
    setCheckButton(false);
  };

  const handleClose = () => {
    setOpen(false);
    setScore(0);
    setAnswers(empty_answers);
    setTimeout(() => {
      setShowScore(false);
      setCheckButton(true);
    }, 1000);
  };

  const answer_rows = [];
  let isFirstOccurrence = true;

  Object.keys(answer_types).forEach((key, index) => {
    if (answer_types[key] === "input")
      answer_rows.push(
        <AnswerInput
          key={index}
          n={index + 1}
          ml={-10}
          handleChange={handleChange}
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
        isFirstOccurrence = false;
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
    // else
    //   answer_rows.push(
    //     <AnswerChoose
    //       key={index}
    //       n={index + 1}
    //       ml={-10}
    //       v={answers.data[key]}
    //       handleChange={handleChangeChoose}
    //     />
    //   );
  });






  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            padding: "1.5em",
          },
        }}
      >
        {showCheckButton && (<DialogTitle id="scroll-dialog-title" sx={{ fontSize: "2em", fontFamily: "Hack", fontWeight: "normal" }} className="text-center">Լրացրեք պատասխանները</DialogTitle>)}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers={scroll === "paper"}
          className="flex flex-row justify-center gap-x-[1em] overflow-hidden"
          sx={{
            "& .MuiDialogContent-root": {
              overflow: "hidden",
            },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {!showScore ? (
            <form className="flex flex-col gap-y-[0.5em]">
              {/* <div className="flex flex-row items-end gap-x-[1em]">
              </div> */}
              {answer_rows}
            </form>
          ) : (
            <div>
              <img src="/Score.png" className="size-90 shrink-0" alt="?" />
              <h2 className="text-2xl text-bold text-center font-[Hack]">
                Ձեր արդյունքն է {score} միավոր
              </h2>
            </div>
          )}
        </DialogContent>
        <DialogActions className="m-auto">
          {showCheckButton && (
            <Button onClick={handleSubmit} variant="contained" type="submit" sx={{fontSize: "1.2em", fontFamily: "Hack", fontWeight: "500", letterSpacing: "1px"}}>
              ՀԱՍՏԱՏԵԼ
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
