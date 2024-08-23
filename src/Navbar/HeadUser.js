/* eslint-disable no-unused-vars */
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const HeaderUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage on logout
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "black", justifyContent: "space-between", height: 80 }}>      
          <Typography 
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              color: "white",
              fontFamily: "Myriad Pro, sans-serif",
            }}
            variant="h5"
            marginTop={"15px"}
          >
            Point
          </Typography>
          <Typography 
            onClick={handleLogout}
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              color: "white",
              fontFamily: "Myriad Pro, sans-serif",
            }}
            variant="h10"
            marginTop={"15px"}
          >
            LOGOUT
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HeaderUser;
