"use client";

import { useState } from "react";

type Tab = "Activity" | "Messages" | "Alerts";
type ApprovalState = "pending" | "publishing" | "approved";

const messages = ["Creative requested approval on Listing 014", "Finance prepared today’s profit summary"];

export function ActivityPanel({
  onOpenBriefing,
  approvalState,
  activities,
}: {
  onOpenBriefing: () => void;
  approvalState: ApprovalState;
  activities: string[];
}) {
  const [tab, setTab] = useState<Tab>("Activity");
  const alerts = approvalState === "pending" ? ["Commerce listing requires CEO approval before publishing"] : [];
  const currentMessages = approvalState === "approved"
    ? ["Commerce confirmed Listing 014 is live", "Finance prepared today’s profit summary"]
    : messages;
  const items = tab === "Activity" ? activities : tab === "Messages" ? currentMessages : alerts;

  return (
    <aside className="activityPanel">
      <div className="panelTabs">
        {(["Activity", "Messages", "Alerts"] as Tab[]).map((item) => (
          <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} type="button" key={item}>
            {item}{item === "Alerts" && alerts.length > 0 && <span>{alerts.length}</span>}
          </button>
        ))}
      </div>
      <div className="activityList">
        {items.length > 0 ? items.map((item, index) => (
          <article key={`${item}-${index}`}>
            <span className={tab === "Alerts" ? "activityPulse alertPulse" : "activityPulse"} aria-hidden="true" />
            <div><p>{item}</p><time>{tab === "Activity" ? (index === 0 ? "Just now" : `${index + 1} min ago`) : "Now"}</time></div>
          </article>
        )) : (
          <div className="clearState"><span>✓</span><strong>System clear</strong><small>No active alerts</small></div>
        )}
      </div>
      <button className="briefingButton" onClick={onOpenBriefing} type="button">Open CEO briefing</button>
    </aside>
  );
}
