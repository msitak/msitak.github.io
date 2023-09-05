import React, {useEffect, useState} from 'react';
import {ListItem} from "@mui/material";
import {StyledListItemText} from "../Favourites/Favourites.styled";
import {Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";

interface IFavourite {
  city: string;
  primary: string;
  to: string;
}

const Favourite = ({ city, primary, to }: IFavourite) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=cfe8422fa76f8eb5bbb4f0db2b3976b9`
        )
      ).json();

      setCoordinates(data);
    };

    dataFetch();
  }, []);

  const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
    itemProps,
    ref,
  ) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
  });

  return (
    <li>
      <ListItem component={Link} to={to} sx={{ p: 0 }}>
        <StyledListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default Favourite;