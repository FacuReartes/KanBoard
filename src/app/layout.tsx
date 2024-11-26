import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
