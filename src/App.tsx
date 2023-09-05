import React from 'react';
import './App.css';
import Favourites from './components/Favourites/Favourites'
import Weather from "./components/Weather/Weather";
import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Box display="flex">
        <Favourites />
        <Weather />
      </Box>
    </BrowserRouter>
  )
}