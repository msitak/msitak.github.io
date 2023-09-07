import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { format } from "date-fns";

const ForecastWeather = (data) => {
  const ForecastWeatherFor5Days = data.list.filter(
    (_, i: number) => i !== 0 && (i + 1) % 8 === 0,
  );

  return (
    <Card
      sx={{
        background: "#EAECEF50",
        border: "none",
        boxShadow: "none",
        borderRadius: "16px",
        py: 3,
        px: 4,
      }}
    >
      <Typography
        textTransform="uppercase"
        variant="subtitle2"
        color="#A8ADB4"
        fontWeight="bold"
      >
        5-day forecast
      </Typography>
      {ForecastWeatherFor5Days.map((data) => (
        <Box
          key={data.dt}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            textTransform="capitalize"
            variant="subtitle1"
            color="#A8ADB4"
          >
            {format(new Date(data.dt_txt), "eee")}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
              sx={{ height: "60px" }}
            />
            <Typography
              textTransform="capitalize"
              variant="subtitle1"
              color="#A8ADB4"
            >
              {data.weather[0].main}
            </Typography>
          </Box>
          <Typography
            textTransform="uppercase"
            variant="subtitle1"
            color="#202B3B"
            fontWeight="bold"
          >
            {Math.round(data.main.temp)}&deg;C
          </Typography>
        </Box>
      ))}
    </Card>
  );
};

export default ForecastWeather;
