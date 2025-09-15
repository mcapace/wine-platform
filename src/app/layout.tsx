import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wine Vintage Charts - Premium Platform",
  description: "State-of-the-art wine vintage analysis and visualization platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
