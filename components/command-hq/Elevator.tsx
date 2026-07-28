"use client";

import { motion } from "motion/react";

export function Elevator() {
  return (
    <section className="elevatorTower" aria-label="Central elevator">
      <header><span>LIFT</span><b>02</b></header>
      <div className="elevatorShaft">
        <div className="shaftRails"><i/><i/></div>
        <motion.div className="elevatorCar" animate={{ y: [8, 128, 8] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, .52, 1] }}>
          <span className="elevatorDoor doorA"/><span className="elevatorDoor doorB"/><b>G</b>
        </motion.div>
        <div className="floorMarker marker2">2</div><div className="floorMarker marker1">1</div>
      </div>
    </section>
  );
}
