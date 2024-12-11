'use client'
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { Outfit } from 'next/font/google'
import { Provider } from "react-redux";
import { store } from "@/state/store";
 
const oswald = Outfit({
  subsets: ['latin'],
  variable: '--outfit'
})

/*
export const metadata: Metadata = {
  title: "KanBoard",
  description: "Simplified task management using Kanban principles",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
