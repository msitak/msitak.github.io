import React, { createContext, useContext, useState } from "react";

interface IWeatherContext {
  currentWeatherData: any;
  setCurrentWeatherData: React.Dispatch<React.SetStateAction<any>>;
  forecastWeatherData: any;
  setForecastWeatherData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  favourites: any;
  addFavourite: (city: IFavouriteCity) => void;
  removeFavourite: (id: number) => void;
}

export interface IFavouriteCity {
  id: number;
  name: string;
  country: string;
  temperature: number;
  humidity: number;
  description: string;
  lat: number;
  lon: number;
}

const WeatherContext = createContext<IWeatherContext | undefined>(undefined);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (favouriteCity: IFavouriteCity) => {
    setFavourites((prev) => [...prev, favouriteCity]);
  };

  const removeFavourite = (id: number) => {
    setFavourites((prev) =>
      prev.filter((favouriteCity) => id !== favouriteCity.id),
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeatherData,
        setCurrentWeatherData,
        forecastWeatherData,
        setForecastWeatherData,
        isLoading,
        setIsLoading,
        favourites,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
