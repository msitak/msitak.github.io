import React from "react";
import { IFavouriteCity, useWeather } from "../../context/WeatherContext";
import { Box, Typography } from "@mui/material";
import { setCurrentWeather, setForecastWeather } from "../../setters";

const Favourite = (props: IFavouriteCity) => {
  const { setIsLoading, setCurrentWeatherData, setForecastWeatherData } =
    useWeather();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 2,
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
        "&:hover": {
          background: "#a8adb4b8",
        },
      }}
      onClick={() => {
        if (props) {
          setCurrentWeather(
            props.lat,
            props.lon,
            setIsLoading,
            setCurrentWeatherData,
          );
          setForecastWeather(
            props.lat,
            props.lon,
            setIsLoading,
            setForecastWeatherData,
          );
        }
      }}
    >
      <Box>
        <Typography variant="h5">
          {props.name}, {props.country}
        </Typography>
        <Typography variant="subtitle2">
          {props.description}, humidity: {props.humidity}%
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" color="#202B3B" fontWeight="bold">
          {Math.round(props.temperature)}&deg;C
        </Typography>
      </Box>
    </Box>
  );
};

export default Favourite;
