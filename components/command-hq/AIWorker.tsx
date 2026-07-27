"use client";

import { motion } from "motion/react";

type Props = { variant: number; walking?: boolean; label: string };

export function AIWorker({ variant, walking = false, label }: Props) {
  return (
    <motion.button
      className={`worker worker-${variant}`}
      type="button"
      aria-label={label}
      animate={walking ? { x: [0, 34, 0] } : { y: [0, -2, 0] }}
      transition={{ duration: walking ? 8 : 3 + variant, repeat: Infinity, ease: "easeInOut", delay: variant * 0.45 }}
      whileHover={{ scale: 1.12 }}
    >
      <span className="workerHead" />
      <span className="workerBody" />
      <span className="workerRing" />
    </motion.button>
  );
}
