"use client";

import { useState } from "react";
import { activities } from "@/data/genesis";

type Tab = "Activity" | "Messages" | "Alerts";

const messages = ["Creative requested approval on Listing 014", "Finance prepared today’s profit summary"];
const alerts = ["Commerce listing requires CEO approval before publishing"];

export function ActivityPanel({ onOpenBriefing }: { onOpenBriefing: () => void }) {
  const [tab, setTab] = useState<Tab>("Activity");
  const items = tab === "Activity" ? activities : tab === "Messages" ? messages : alerts;

  return (
    <aside className="activityPanel">
      <div className="panelTabs">
        {(["Activity", "Messages", "Alerts"] as Tab[]).map((item) => (
          <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} type="button" key={item}>
            {item}{item === "Alerts" && <span>1</span>}
          </button>
        ))}
      </div>
      <div className="activityList">
        {items.map((item, index) => (
          <article key={item}>
            <span className={tab === "Alerts" ? "activityPulse alertPulse" : "activityPulse"} aria-hidden="true" />
            <div><p>{item}</p><time>{tab === "Activity" ? `${index + 2} min ago` : "Now"}</time></div>
          </article>
        ))}
      </div>
      <button className="briefingButton" onClick={onOpenBriefing} type="button">Open CEO briefing</button>
    </aside>
  );
}
