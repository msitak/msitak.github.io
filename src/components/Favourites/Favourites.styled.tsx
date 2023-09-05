import { styled } from '@mui/material/styles';
import { ListItemText } from "@mui/material";

export const StyledListItemText = styled(ListItemText)`
  text-decoration: none;
  font-size: 36px;
  color: #545F71;
  text-transform: capitalize;
  padding: 16px 24px;
  
  span {
    font-weight: bold;
    font-family: Roboto, sans-serif;
  }
`