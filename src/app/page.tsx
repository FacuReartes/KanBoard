'use client'
import Board from "@/components/Board";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box sx={{ 
          display: 'flex', 
          minHeight: '100vh',
          overflow: 'hidden' 
        }}>
          <Sidebar/>
          <Board/>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}
