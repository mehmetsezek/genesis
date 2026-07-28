"use client";

import { motion } from "motion/react";

export function Elevator() {
  return (
    <div className="elevator" aria-label="Central elevator moving between headquarters floors">
      <div className="elevatorCrown">G</div>
      <div className="elevatorRail" />
      <motion.div
        className="elevatorCar"
        animate={{ y: [0, 0, 116, 116, 0] }}
        transition={{ duration: 16, repeat: Infinity, times: [0, .25, .42, .72, 1], ease: "easeInOut" }}
      >
        <div className="elevatorDisplay">{phaseLabel()}</div>
        <div className="elevatorDoors"><i/><i/></div>
        <span className="elevatorPassenger" />
      </motion.div>
      <div className="floorDots"><i/><i/><i/></div>
    </div>
  );
}

function phaseLabel() { return "01"; }
