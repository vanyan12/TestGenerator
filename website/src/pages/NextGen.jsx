import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'; // Optional: for a nicer background

export default function NexGen({nextAvailableTime }) {


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh', // Adjust as needed to center vertically on the screen
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 800, width: '100%' }}>
        <Typography variant="h5" component="h1" gutterBottom>
            Նոր թեստ ստեղծելու հնարավորությունը հասանելի չէ
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          Խնդրում ենք լրացնել հարցումը Հետադարձ կապ բաժնում
        </Typography>
        {nextAvailableTime && (
          <Typography variant="caption" display="block" color="text.secondary">
            Դուք կարող եք նոր թեստ գեներացնել: {new Date(nextAvailableTime).toLocaleString('hy-AM', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })} -ից հետո
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
