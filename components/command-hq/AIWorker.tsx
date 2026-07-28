"use client";

import { motion } from "motion/react";

type Props = {
  variant: number;
  walking?: boolean;
  label: string;
  activity?: "typing" | "screen" | "walking" | "reviewing";
  className?: string;
};

export function AIWorker({ variant, walking = false, label, activity = walking ? "walking" : "typing", className = "" }: Props) {
  const movement = walking
    ? { x: [0, 64, 64, 0], scaleX: [1, 1, -1, -1] }
    : activity === "screen"
      ? { y: [0, -2, 0], rotate: [0, -2, 0, 2, 0] }
      : { y: [0, -2, 0] };

  return (
    <motion.button
      className={`worker worker-${variant} worker-${activity} ${className}`}
      type="button"
      aria-label={label}
      animate={movement}
      transition={{ duration: walking ? 8 : 2.4 + variant * 0.3, repeat: Infinity, ease: "easeInOut", delay: variant * 0.4 }}
      whileHover={{ scale: 1.1 }}
    >
      <span className="workerShadow" />
      <span className="workerHead" />
      <span className="workerHair" />
      <span className="workerBody" />
      <span className="workerArm" />
      <span className="workerLeg workerLegA" />
      <span className="workerLeg workerLegB" />
      <span className="workerTablet" />
      <span className="workerAura" />
    </motion.button>
  );
}
