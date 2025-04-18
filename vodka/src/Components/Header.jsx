import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";

export default function Header({ isLoggedIn, userAvatar, onGenerate }) {
  return (
    <AppBar position="fixed" color="primary" >
      <Toolbar >
        {/* Website Name on the Left */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Website Name
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit">About Us</Button>
        <Button color="inherit">Contact Us</Button>
        <Button color="inherit" onClick={onGenerate}>Generate</Button>

        {/* User Avatar if Logged In */}
        {isLoggedIn && (
          <Box sx={{ ml: 2 }}>
            <Avatar alt="User Avatar" src={userAvatar} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
