import React from "react";
import Favourites from "./components/Favourites/Favourites";
import { Box, Container } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import WeatherWrapper from "./components/Weather/WeatherWrapper";
import Search from "./components/Search/Search";

export default function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Box display="flex">
          <Favourites />
          <Container>
            <Search />
            <WeatherWrapper />
          </Container>
        </Box>
      </BrowserRouter>
    </WeatherProvider>
  );
}
