import React from "react";
import {
  Autocomplete,
  Box,
  debounce,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { v4 as uuidv4 } from "uuid";
import { useWeather } from "../../context/WeatherContext";
import { setCurrentWeather, setForecastWeather } from "../../setters";

interface ILocation {
  name: string;
  country: string;
  lat?: number;
  lon?: number;
}

const Search = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly ILocation[]>([]);
  const { setIsLoading, setCurrentWeatherData, setForecastWeatherData } =
    useWeather();

  const getCityPredictions = React.useMemo(
    () =>
      debounce((request: { input: string }) => {
        fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${request.input}&limit=5&appid=${process.env["REACT_APP_WEATHER_API_KEY"]}`,
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setOptions(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 400),
    [],
  );

  React.useEffect(() => {
    if (inputValue === "") {
      return undefined;
    }

    getCityPredictions({ input: inputValue });
  }, [inputValue, getCityPredictions]);

  return (
    <Autocomplete
      id="location-search"
      freeSolo
      sx={{ width: "100%", pt: 2 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText="No locations"
      onChange={(_, location: ILocation | null) => {
        if (location) {
          setCurrentWeather(
            location.lat,
            location.lon,
            setIsLoading,
            setCurrentWeatherData,
          );
          setForecastWeather(
            location.lat,
            location.lon,
            setIsLoading,
            setForecastWeatherData,
          );
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          fullWidth
          sx={{
            borderRadius: "16px",
            background: "#EAECEF50",
            "& fieldset": { border: "none" },
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={uuidv4()}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {option.name}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {option.country}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default Search;
