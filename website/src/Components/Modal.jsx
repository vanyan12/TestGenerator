import * as React from "react";
import { useState } from "react";
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

export default function Modal({ open, handleClose, score }) {


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
          <div>
            <img src="/Score.png" className="size-90 shrink-0" alt="?" />
            <h2 className="text-2xl font-normal text-center font-[Hack]">
              Ձեր արդյունքն է {score} միավոր
            </h2>
          </div>  
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
