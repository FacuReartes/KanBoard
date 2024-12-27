import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from 'next/font/google'
 
const oswald = Outfit({
  subsets: ['latin'],
  variable: '--outfit'
})

export const metadata: Metadata = {
  title: "KanBoard",
  description: "Simplified task management using Kanban principles",
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        {children}
      </body>
    </html>
  );
}
