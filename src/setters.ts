import React from "react";

export const setCurrentWeather = (
  lat: number,
  lon: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentWeatherData: React.Dispatch<React.SetStateAction<any>>,
) => {
  setIsLoading(true);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env["REACT_APP_WEATHER_API_KEY"]}&units=metric`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setCurrentWeatherData(data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const setForecastWeather = (
  lat: number,
  lon: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setForecastWeatherData: React.Dispatch<React.SetStateAction<any>>,
) => {
  setIsLoading(true);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=120&appid=${process.env["REACT_APP_WEATHER_API_KEY"]}&units=metric`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setForecastWeatherData(data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
