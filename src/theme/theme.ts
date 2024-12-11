import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'var(--outfit)'
  },
  palette: {
    primary: {
      main: '#00A8E8',
      light: '#007EA7'
    },
    secondary: {
      main: '#003459',
    },
    common: {
      black: '#00171F',
      white: '#fff',
    }
  }
})

export default theme