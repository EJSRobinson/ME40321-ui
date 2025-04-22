import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#eee',
      paper: '#fff',
    },
    text: {
      primary: '#22303d',
      secondary: '#848a91',
    },
    primary: {
      main: '#90322a',
    },
    secondary: {
      main: '#f6861f',
    },
    warning: {
      light: '#ecdf62',
      main: '#ecd718',
    },
  },
});

export default theme;
