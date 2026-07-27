import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genesis Command HQ",
  description: "The living operating system for an AI-run business.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
