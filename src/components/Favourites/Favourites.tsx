import React, { useState } from "react";
import { Box, List, Paper, TextField, Typography } from "@mui/material";
import Favourite from "../Favourite/Favourite";
import { IFavouriteCity, useWeather } from "../../context/WeatherContext";
import SortIcon from "@mui/icons-material/Sort";

const Favourites = () => {
  const { favourites } = useWeather();
  const [filterText, setFilterText] = useState("");
  const filteredFavourites = favourites.filter((city) =>
    city.name.toLowerCase().includes(filterText.toLowerCase()),
  );
  const [sortDirection, setSortDirection] = useState("asc");

  const [filteredAndSortedFavourites, setFilteredAndSortedFavourites] =
    useState(filteredFavourites);

  React.useEffect(() => {
    let sorted;

    if (sortDirection === "asc") {
      sorted = [...filteredFavourites].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    } else {
      sorted = [...filteredFavourites].sort((a, b) =>
        b.name.localeCompare(a.name),
      );
    }

    setFilteredAndSortedFavourites(sorted);
  }, [favourites, filteredFavourites, sortDirection]);

  const toggleSortDirection = () => {
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  return (
    <Box sx={{ width: 360 }}>
      <Paper elevation={0} sx={{ height: "100%", background: "#A8ADB450" }}>
        <Typography variant="h6" textAlign="center" sx={{ pt: 2 }}>
          Favourite cities
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            label="Filter"
            variant="standard"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <SortIcon
            sx={{ ml: 2, cursor: "pointer" }}
            onClick={toggleSortDirection}
          />
        </Box>
        <List>
          {filteredAndSortedFavourites.map((city: IFavouriteCity) => (
            <Favourite {...city} />
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Favourites;
