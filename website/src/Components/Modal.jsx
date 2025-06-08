import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Modal({ open, handleClose, score, loading }) {


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

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <CircularProgress />
            </Box>
          ) : (
            <div>
              <img src="/Score.png" className="size-90 shrink-0" alt="?" />
              <h2 className="text-2xl font-normal text-center font-[Hack]">
                Ձեր արդյունքն է {score} միավոր
              </h2>
            </div>
          )
          }
            
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
