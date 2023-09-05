import React from "react";
import { Box, List, Paper } from "@mui/material";
import Favourite from "../Favourite/Favourite";

const Favourites = () => {
  const cities: string[] = ['warsaw', 'london', 'barcelona'];

  return (
    <Box sx={{ width: 360 }}>
      <Paper elevation={0} sx={{ height: '100%', background: '#ddd' }}>
        <List>
          {cities.map(city => (
             <Favourite city={city} primary={city} to={city}/>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Favourites;