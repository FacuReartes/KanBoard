import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { Outfit } from 'next/font/google'
 
const oswald = Outfit({
  subsets: ['latin'],
  variable: '--outfit'
})

export const metadata: Metadata = {
  title: "KanBoard",
  description: "Simplified task management using Kanban principles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
