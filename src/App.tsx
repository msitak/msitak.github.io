import './App.css';
import React from 'react';
import {List, ListItem, ListItemText, Box, Typography, Paper} from "@mui/material";
import { StaticRouter } from 'react-router-dom/server';
import {
  MemoryRouter,
  Link as RouterLink,
  LinkProps as RouterLinkProps, useLocation, Routes, Route,
} from "react-router-dom";

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

const Router = (props: { children?: React.ReactNode }) => {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/warsaw">{children}</StaticRouter>;
    }

    return (
      <MemoryRouter initialEntries={['/warsaw']} initialIndex={0}>
          {children}
      </MemoryRouter>
    );
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref,
) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props: ListItemLinkProps) {
    const { primary, to } = props;

    return (
      <li>
          <ListItem component={Link} to={to} sx={{ textDecoration: 'none', color: '#0a0a0a' }}>
              <ListItemText primary={primary} />
          </ListItem>
      </li>
    );
}

function Content() {
    const location = useLocation();
    return (
      <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
          Current route: {location.pathname}
      </Typography>
    );
}

const App = () => {
    const cities: string[] = ['warsaw', 'london', 'barcelona']

    return (
      <Router>
        <Box sx={{ width: 360 }}>
          <Routes>
            <Route path="*" element={<Content />} />
          </Routes>

          <Paper elevation={0}>
            <List aria-label="secondary mailbox folders">
              {cities.map(city => (
                <ListItemLink to={`/${city}`} primary={city} />
              ))}
            </List>
          </Paper>
        </Box>
      </Router>
    );
}

export default App;
