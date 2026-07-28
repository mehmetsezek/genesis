"use client";

import { motion } from "motion/react";

type Props = {
  variant: number;
  walking?: boolean;
  label: string;
  activity?: "typing" | "screen" | "walking" | "reviewing";
};

export function AIWorker({ variant, walking = false, label, activity = walking ? "walking" : "typing" }: Props) {
  const movement = walking
    ? { x: [0, 34, 34, 0], scaleX: [1, 1, -1, -1] }
    : activity === "screen"
      ? { y: [0, -1, 0], rotate: [0, -2, 0, 2, 0] }
      : activity === "reviewing"
        ? { y: [0, -2, 0], x: [0, 2, 0] }
        : { y: [0, -1.5, 0] };

  return (
    <motion.button
      className={`worker worker-${variant} worker-${activity}`}
      type="button"
      aria-label={label}
      animate={movement}
      transition={{
        duration: walking ? 11 : 3.5 + variant,
        repeat: Infinity,
        ease: "easeInOut",
        delay: variant * 0.7,
        repeatDelay: walking ? 3 : 0,
      }}
      whileHover={{ scale: 1.12 }}
    >
      <span className="workerHead" />
      <span className="workerBody" />
      <span className="workerArm" />
      <span className="workerRing" />
    </motion.button>
  );
}
