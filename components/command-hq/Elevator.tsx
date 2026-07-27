"use client";

import { motion } from "motion/react";

export function Elevator() {
  return (
    <div className="elevator" aria-label="Central elevator">
      <div className="elevatorRail" />
      <motion.div
        className="elevatorCar"
        animate={{ y: [0, 246, 492, 246, 0] }}
        transition={{ duration: 22, repeat: Infinity, times: [0, 0.28, 0.52, 0.76, 1], ease: "easeInOut" }}
      >
        <span>G</span>
        <div className="elevatorDoors" />
      </motion.div>
      <div className="floorDots"><i /><i /><i /></div>
    </div>
  );
}
