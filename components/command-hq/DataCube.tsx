"use client";

import { motion } from "motion/react";

type Props = {
  route: "creative-commerce" | "operations-finance" | "ai-commerce";
  delay?: number;
};

const ROUTES = {
  "creative-commerce": { x: [0, 150, 330], y: [0, -8, 0], duration: 12 },
  "operations-finance": { x: [0, -160, -330], y: [0, 8, 0], duration: 15 },
  "ai-commerce": { x: [0, -8, -8], y: [0, 112, 225], duration: 14 },
} as const;

export function DataCube({ route, delay = 0 }: Props) {
  const path = ROUTES[route];
  return (
    <motion.div
      className={`dataCube dataCube-${route}`}
      aria-hidden="true"
      animate={{ x: path.x, y: path.y, opacity: [0, 1, 1, 0], rotate: [0, 90, 180] }}
      transition={{
        duration: path.duration,
        repeat: Infinity,
        repeatDelay: 5,
        delay,
        ease: "easeInOut",
        times: [0, 0.12, 0.82, 1],
      }}
    >
      <i />
    </motion.div>
  );
}
