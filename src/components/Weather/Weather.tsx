import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IFavouriteCity, useWeather } from "../../context/WeatherContext";

const Weather = (data) => {
  const { favourites, addFavourite, removeFavourite } = useWeather();

  /**
   * Gets last refresh time of location with its timezone
   * @param dt Time of data calculation, unix, UTC
   * @param timezone Shift in seconds from UTC
   */
  const getLastRefreshTime = (dt: number, timezone: number) => {
    return new Date(dt * 1000 + timezone * 1000)
      .toISOString()
      .substring(11, 16);
  };

  const handleToggleFavorite = (favouriteCity: IFavouriteCity) => {
    const isFavorite = favourites.some((fav) => fav.id === favouriteCity.id);

    if (isFavorite) {
      removeFavourite(favouriteCity.id);
    } else {
      addFavourite(favouriteCity);
    }
  };

  const favouriteCityData: IFavouriteCity = {
    id: data.id,
    name: data.name,
    humidity: data.main.humidity,
    country: data.sys.country,
    description: data.weather[0].description,
    temperature: data.main.temp,
    lon: data.coord.lon,
    lat: data.coord.lat,
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Box display="flex" alignItems="center" sx={{ mt: 2, pl: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="#202B3B">
              {data.name}, {data.sys.country}
            </Typography>
            {favourites.some((fav) => fav.id === data.id) ? (
              <FavoriteIcon
                onClick={() => handleToggleFavorite(favouriteCityData)}
                sx={{ ml: 2, cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => handleToggleFavorite(favouriteCityData)}
                sx={{ ml: 2, cursor: "pointer" }}
              />
            )}
          </Box>
          <Typography variant="subtitle2" color="#A8ADB4" sx={{ pl: 4 }}>
            {data.weather[0].description},{" "}
            {getLastRefreshTime(data.dt, data.timezone)}
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="#202B3B"
            sx={{ mt: 5, pl: 4 }}
          >
            {Math.round(data.main.temp)}&deg;C
          </Typography>
        </Box>
        <Box>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt="weather icon"
          />
        </Box>
      </Box>
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
          Air conditions
        </Typography>
        <Grid container sx={{ px: 3, mt: 3 }}>
          <Grid item md={6}>
            <Typography color="#A8ADB4" variant="subtitle1">
              Real feel
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {Math.round(data.main.feels_like)}&deg;C
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography color="#A8ADB4" variant="subtitle1">
              Wind
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {data.wind.speed} m/s
            </Typography>
          </Grid>
          <Grid item md={6} sx={{ mt: 2 }}>
            <Typography color="#A8ADB4" variant="subtitle1">
              Pressure
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {data.main.pressure} hPa
            </Typography>
          </Grid>
          <Grid item md={6} sx={{ mt: 2 }}>
            <Typography color="#A8ADB4" variant="subtitle1">
              Humidity
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {data.main.humidity}%
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Weather;
