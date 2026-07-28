"use client";

import { motion } from "motion/react";

type DayPhase = "dawn" | "day" | "dusk" | "night";

export function LivingSkyline({ phase }: { phase: DayPhase }) {
  return (
    <div className={`livingSkyline skyline-${phase}`} aria-hidden="true">
      <div className="skyGlow" />
      <motion.div className="cloud cloudOne" animate={{ x: [0, 90, 0] }} transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="cloud cloudTwo" animate={{ x: [0, -70, 0] }} transition={{ duration: 58, repeat: Infinity, ease: "easeInOut" }} />
      <div className="cityLayer cityBack"><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="cityLayer cityFront"><i/><i/><i/><i/><i/><i/></div>
      <motion.span className="aircraft" animate={{ x: [0, 540], opacity: [0, 1, 1, 0] }} transition={{ duration: 20, repeat: Infinity, repeatDelay: 18, ease: "linear" }} />
      <div className="matrixCurtain" />
    </div>
  );
}
