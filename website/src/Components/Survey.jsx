import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import VerticalStepper from "./Stepper"

export default function Survey({ open, handleClose, onSubmit }) {
  const [submited, setSubmited] = useState(false);

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
          {submited ? 
          (
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-center text-2xl font-bold mb-4">Շնորհակալություն հարցմանը մասնակցելու համար</h3>
              <img src="./Collaboration.png" alt="" className="size-100"/>
            </div>
          ) : 
          (<VerticalStepper setSubmited={setSubmited} onSubmit={onSubmit}/>)
          }
          
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
