import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ErrorIcon from '@mui/icons-material/Error';
import Alert from '@mui/material/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { customColors } from '../theme/colors';

export default function AlertMsg({open, handleClose, message, status}) {
  let icon;
  let bgColor;

  switch (status) {
    case 'success':
      icon = <HowToRegIcon fontSize="inherit" />;
      bgColor = customColors.success;
      break;
    case 'error':
      icon = <ErrorIcon fontSize="inherit" />;
      bgColor = customColors.error;
      break;
    case 'warning':
      icon = <WarningAmberIcon fontSize="inherit" />;
      bgColor = customColors.warning;
      break;
    default:
      break;
  }


  return (
      <Snackbar 
        open={open} 
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        
      >
      <Alert 
        icon={icon} 
        sx={{
          backgroundColor: bgColor, 
          '& .MuiAlert-icon': {
          color: customColors.alertTextColor,
        },
        color: customColors.alertTextColor,
        }}
        variant='filled'
      >
        {message}
      </Alert>
      </Snackbar>
  );
}
