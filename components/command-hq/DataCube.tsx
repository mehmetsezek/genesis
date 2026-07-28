"use client";

import { motion } from "motion/react";

type Props = { route: "creative-commerce" | "operations-finance" | "ai-commerce"; delay?: number };

const ROUTES: Record<Props["route"], { x: number[]; y: number[]; duration: number }> = {
  "creative-commerce": { x: [0, 180, 360], y: [0, -7, 0], duration: 8.5 },
  "operations-finance": { x: [0, -185, -370], y: [0, 8, 0], duration: 9.2 },
  "ai-commerce": { x: [0, 82, 168], y: [0, -58, -118], duration: 8.8 },
};

export function DataCube({ route, delay = 0 }: Props) {
  const path = ROUTES[route];
  return (
    <motion.div
      className={`dataCube dataCube-${route}`}
      aria-hidden="true"
      animate={{ x: path.x, y: path.y, opacity: [0, 1, 1, 0], rotate: [0, 140, 280], scale: [.72, 1.16, 1, .72] }}
      transition={{ duration: path.duration, repeat: Infinity, repeatDelay: 2.2, delay, ease: "easeInOut", times: [0, .12, .82, 1] }}
    ><i/><b/></motion.div>
  );
}
