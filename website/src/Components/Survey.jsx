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
import VerticalStepper from "./Stepper"

export default function Survey({ open, handleClose }) {


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
          <VerticalStepper />
          
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
