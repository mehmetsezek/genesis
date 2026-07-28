"use client";

import { motion } from "motion/react";

export function Elevator() {
  return (
    <div className="elevator" aria-label="Central elevator moving between headquarters floors">
      <div className="elevatorRail" />
      <motion.div
        className="elevatorCar"
        animate={{ y: [0, 0, 246, 246, 492, 492, 246, 246, 0] }}
        transition={{ duration: 26, repeat: Infinity, times: [0, .12, .22, .35, .46, .6, .7, .84, 1], ease: "easeInOut" }}
      >
        <motion.span animate={{ opacity: [1, .45, 1] }} transition={{ duration: 2.8, repeat: Infinity }}>G</motion.span>
        <div className="elevatorDoors">
          <motion.i className="doorLeft" animate={{ x: [0, -8, 0] }} transition={{ duration: 5.2, repeat: Infinity, repeatDelay: 7 }} />
          <motion.i className="doorRight" animate={{ x: [0, 8, 0] }} transition={{ duration: 5.2, repeat: Infinity, repeatDelay: 7 }} />
        </div>
        <span className="elevatorPassenger" aria-hidden="true" />
      </motion.div>
      <div className="floorDots"><i /><i /><i /></div>
    </div>
  );
}
