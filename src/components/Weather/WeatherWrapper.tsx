import React from "react";
import { useWeather } from "../../context/WeatherContext";
import Weather from "./Weather";
import { Container, Grid } from "@mui/material";
import ForecastWeather from "./ForecastWeather";

const WeatherWrapper = () => {
  const { currentWeatherData, forecastWeatherData, isLoading } = useWeather();

  if (isLoading) {
    return (
      <Container maxWidth={false}>
        <p>loading...</p>
      </Container>
    );
  }

  if (!currentWeatherData || !forecastWeatherData) {
    return (
      <Container maxWidth={false}>
        <p>no weather data.</p>
      </Container>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item md={8}>
        <Weather {...currentWeatherData} />
      </Grid>
      <Grid item md={4}>
        <ForecastWeather {...forecastWeatherData} />
      </Grid>
    </Grid>
  );
};

export default WeatherWrapper;
