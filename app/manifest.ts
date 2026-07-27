import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Genesis Command HQ",
    short_name: "Genesis",
    description: "The living operating system for an AI-run business.",
    start_url: "/",
    display: "standalone",
    background_color: "#030605",
    theme_color: "#07100c",
    icons: [{ src: "/genesis-icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
