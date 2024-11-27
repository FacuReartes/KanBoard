'use client'
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0c79ed',
    },
    secondary: {
      main: '#b9a3e3',
    },
    common: {
      black: '#0E0E10',
      white: '#fff',
    },
    grey: {
      500: '#9db0c4'
    }
  }
})

export default theme