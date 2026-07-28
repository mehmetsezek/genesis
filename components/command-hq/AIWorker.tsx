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
    ? { x: [0, 72, 72, 0], scaleX: [1, 1, -1, -1] }
    : activity === "screen"
      ? { y: [0, -3, 0], rotate: [0, -4, 0, 4, 0] }
      : activity === "reviewing"
        ? { y: [0, -3, 0], x: [0, 4, 0] }
        : { y: [0, -2.5, 0] };

  return (
    <motion.button
      className={`worker worker-${variant} worker-${activity}`}
      type="button"
      aria-label={label}
      animate={movement}
      transition={{
        duration: walking ? 7.5 : 2.2 + variant * .55,
        repeat: Infinity,
        ease: "easeInOut",
        delay: variant * .55,
        repeatDelay: walking ? 1.4 : 0,
      }}
      whileHover={{ scale: 1.16 }}
    >
      <span className="workerShadow" />
      <span className="workerHead" />
      <span className="workerBody" />
      <span className="workerArm" />
      <span className="workerTablet" />
      <span className="workerRing" />
    </motion.button>
  );
}
