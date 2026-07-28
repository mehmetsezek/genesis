"use client";

import { motion } from "motion/react";

const cubes = [
  { className: "cubeCreative", x: [0, 220, 430], y: [0, 0, 0], delay: 0 },
  { className: "cubeFinance", x: [0, 180, 365], y: [0, 0, 0], delay: 2.4 },
  { className: "cubeVertical", x: [0, 0, 0], y: [0, -112, -220], delay: 4.8 },
];

export function AmbientDataFlow() {
  return <div className="ambientDataFlow" aria-hidden="true">
    {cubes.map((cube) => <motion.span key={cube.className} className={`premiumCube ${cube.className}`} animate={{ x: cube.x, y: cube.y, rotate: [45, 225, 405], opacity: [0, 1, 1, 0] }} transition={{ duration: 7.5, repeat: Infinity, delay: cube.delay, ease: "easeInOut" }}><i/></motion.span>)}
  </div>;
}
