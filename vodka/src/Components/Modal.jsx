import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import Answer from "./Answer"
import { RadioGroup , Alert} from '@mui/material';

export default function Modal({open, setOpen, taskCount}) {
  const [answers, setAnswers] = useState(
    Array.from({ length: taskCount }, (_, i) => [i + 1, null])
    .reduce((acc, [id, val]) => ({ ...acc, [id]: val }), {})
  );

  
  const handleChange = (questionNumber) => (event) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: event.target.value,
    }));
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(answers)
    };

    const handleClose = () => {
      setOpen(false);
    };

    // const task_numbering = []
    const answer_rows = [] 


    for (let i = 2; i <= taskCount; i++) {
      if(i>=10) answer_rows.push(<Answer key={i} n={i} ml={-10} v={answers[i]} handlehange={handleChange}/>)
      else answer_rows.push(<Answer key={i} n={i} v={answers[i]} handlehange={handleChange}/>)
    }
  
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          sx={{
            '& .MuiPaper-root': {
              padding: "1em",
            }
          }}
        >
        <DialogTitle id="scroll-dialog-title" sx={{fontSize: "2em"}}> Fill your answer sheet</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
          <DialogContent dividers={scroll === 'paper'} className='flex flex-row justify-center gap-x-[1em] overflow-hidden' 
          sx={{
            '& .MuiDialogContent-root': {
              overflow: 'hidden'
            },
            '&::-webkit-scrollbar': {
              display: "none"
            },
          }}
          >

            <form>
              <div className='flex flex-row items-end'>
                  <div className='text-xl text-b pb-[9px]'>1</div>
                  <div>
                    <RadioGroup name='q1' onChange={handleChange(1)} row>
                      <FormControlLabel sx={{margin: "0"}} value="1" control={<Radio />} labelPlacement='top' label="1"/>
                      <FormControlLabel sx={{margin: "0"}} value="2" control={<Radio />} labelPlacement='top' label="2"/>
                      <FormControlLabel sx={{margin: "0"}} value="3" control={<Radio />} labelPlacement='top' label="3"/>
                      <FormControlLabel sx={{margin: "0"}} value="4" control={<Radio />} labelPlacement='top' label="4"/>
                    </RadioGroup>
                  </div>

                </div>
                {answer_rows}
            </form>


          </DialogContent>
          <DialogActions className='m-auto'>
            <Button onClick={handleSubmit} variant='contained' type='submit'>Check</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  