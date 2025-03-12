import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

export default function Modal({open, setOpen}) {
  
    const handleClose = () => {
      setOpen(false);
    };
  
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
          <DialogContent dividers={scroll === 'paper'} className='flex flex-row justify-center gap-x-[1em]' >
            <div className='flex flex-col items-end gap-y-[0.5em] text-2xl mt-[1.15em]'>
              <div>
                <p>1</p>
              </div>
              <div>
                <p>2</p>
              </div>
              <div>
                <p>3</p>
              </div>
            </div>

            <div className='flex flex-col'> 
              <div>
              <FormControlLabel sx={{margin: "0"}} value="1" control={<Radio />} labelPlacement='top' label="1"/>
              <FormControlLabel sx={{margin: "0"}} value="2" control={<Radio />} labelPlacement='top' label="2"/>
              <FormControlLabel sx={{margin: "0"}} value="3" control={<Radio />} labelPlacement='top' label="3"/>
              <FormControlLabel sx={{margin: "0"}} value="4" control={<Radio />} labelPlacement='top' label="4"/>
              </div>
              <div>
                <Radio />
                <Radio />
                <Radio />
                <Radio />
              </div>
              <div>
                <Radio />
                <Radio />
                <Radio />
                <Radio />
              </div>

            </div>
          </DialogContent>
          <DialogActions className='m-auto'>
            <Button onClick={handleClose} variant='contained'>Cancel</Button>
            <Button onClick={handleClose} variant='contained'>Check</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  