import React from 'react';
import { Box } from "@mui/material";
import {useLocation} from "react-router-dom";

const Weather = () => {
  const location = useLocation();


  return (
    <Box>
      <h1>{location.pathname}</h1>
    </Box>
  )
}

export default Weather;