import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genesis Command HQ",
  description: "The living operating system for an AI-run business.",
  applicationName: "Genesis",
  appleWebApp: { capable: true, title: "Genesis", statusBarStyle: "black-translucent" },
  icons: { icon: "/genesis-icon.svg", apple: "/genesis-icon.svg" },
};

export const viewport: Viewport = { themeColor: "#030605", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
