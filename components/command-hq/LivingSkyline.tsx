"use client";

import { useEffect, useMemo, useState } from "react";

function periodFor(hour: number) {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "dusk";
  return "night";
}

export function LivingSkyline() {
  const [hour, setHour] = useState(22);

  useEffect(() => {
    const update = () => setHour(new Date().getHours());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const period = useMemo(() => periodFor(hour), [hour]);
  return (
    <div className={`livingSkyline skyline-${period}`} aria-label={`Local ${period} skyline`}>
      <div className="skyGlow" />
      <div className="cityLayer cityBack" />
      <div className="cityLayer cityFront" />
      <div className="skylineRain" />
      <div className="skylineScan" />
    </div>
  );
}
