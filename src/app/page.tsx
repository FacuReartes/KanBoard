'use client'
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import KanBan from "@/components/KanBan";

export default function Home() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <KanBan/>
      </ThemeProvider>
    </Provider>
  );
}
