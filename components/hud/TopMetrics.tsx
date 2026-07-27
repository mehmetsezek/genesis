"use client";

import { useEffect, useState } from "react";
import { metrics } from "@/data/genesis";

export function TopMetrics() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="topMetrics" aria-label="Company metrics">
      <div className="brandLockup">
        <span className="brandMark">G</span>
        <div><strong>GENESIS</strong><small>COMMAND HQ</small></div>
      </div>
      <div className="metricRail">
        {metrics.map((metric) => (
          <button className="metric" key={metric.label} type="button">
            <span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.trend}</small>
          </button>
        ))}
        <div className="metric clock"><span>Local Time</span><strong>{time || "--:--"}</strong><small>Device timezone</small></div>
      </div>
    </header>
  );
}
