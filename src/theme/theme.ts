import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'var(--outfit)'
  },
  palette: {
    primary: {
      //main: '#6366F1',
      main: '#5046E5',
      //light: '#C7D2FE'
      light: '#6366F1'
    },
    secondary: {
      main: '#003459',
    },
    common: {
      black: '#1C1C1C',
      white: '#fff',
    },
    grey: {
      //500: '#212121'
      500: '#F9FAFC'
    }
  }
})

export default theme