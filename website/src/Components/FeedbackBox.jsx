import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import AlertMsg from './AlertMsg';
import {useAuth} from './AuthContext';

export default function FeedbackBox() {
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const {user} = useAuth();

  const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setAlertOpen(false); // This line is crucial for autoHideDuration to work
  };



  const sendFeedback = () => {
    const payload = {
        email: user['email'] || 'anonymous',
        message: feedback,
    }

    fetch("http://127.0.0.1:8000/send-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (response.ok) {
        setFeedback('');
        setStatus('success');
      } else {
        setStatus('error');
      }
      setFeedback('');
      setAlertOpen(true);
    })
    
  }

  return (
    <FormControl>
      <FormLabel>Ձեր կարծիքը կարևոր է մեզ համար</FormLabel>
      <Textarea
        placeholder="Կիսվեք ձեր կարծիքով, առաջարկություններով կամ հարցերով"
        minRows={3}
        value={feedback}
        variant='soft'
        onChange={(e) => setFeedback(e.target.value)}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size="sm"
              placement="bottom-start"
              sx={{ '--ListItemDecorator-size': '24px' }}
            >
              {['200', 'normal', 'bold'].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItemDecorator>
                    {fontWeight === weight && <Check fontSize="sm" />}
                  </ListItemDecorator>
                  {weight === '200' ? 'lighter' : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? 'soft' : 'plain'}
              color={italic ? 'primary' : 'neutral'}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            <Button sx={{ ml: 'auto' }} onClick={sendFeedback}>Ուղարկել</Button>
          </Box>
        }
        sx={[
          {
            minWidth: "40vw",
            fontWeight,
          },
          italic ? { fontStyle: 'italic' } : { fontStyle: 'initial' },
        ]}
      />

      <AlertMsg
        open={alertOpen}
        handleClose={handleCloseAlert}
        message={status === 'success' ? 'Ձեր կարծիքը հաջողությամբ ուղարկվել է' : 'Սխալ է տեղի ունեցել, խնդրում ենք փորձել նորից'}
        status="success"
      />
    </FormControl>
  );
}
