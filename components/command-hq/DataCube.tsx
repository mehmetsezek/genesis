"use client";

import { motion } from "motion/react";

type Props = {
  route: "creative-commerce" | "operations-finance" | "ai-commerce";
  delay?: number;
};

type MotionRoute = {
  x: number[];
  y: number[];
  duration: number;
};

const ROUTES: Record<Props["route"], MotionRoute> = {
  "creative-commerce": { x: [0, 118, 255], y: [0, -10, 0], duration: 7.5 },
  "operations-finance": { x: [0, -125, -255], y: [0, 10, 0], duration: 8.5 },
  "ai-commerce": { x: [0, -4, -4], y: [0, 88, 176], duration: 8 },
};

export function DataCube({ route, delay = 0 }: Props) {
  const path = ROUTES[route];
  return (
    <motion.div
      className={`dataCube dataCube-${route}`}
      aria-hidden="true"
      animate={{ x: path.x, y: path.y, opacity: [0, 1, 1, 0], rotate: [0, 120, 240], scale: [.7, 1.18, 1, .7] }}
      transition={{
        duration: path.duration,
        repeat: Infinity,
        repeatDelay: 2.5,
        delay,
        ease: "easeInOut",
        times: [0, 0.12, 0.82, 1],
      }}
    >
      <i /><b />
    </motion.div>
  );
}
