"use client";

import { useEffect, useMemo, useState } from "react";
import type { Department, DepartmentId } from "@/data/genesis";
import { activities as initialActivities, departments as initialDepartments } from "@/data/genesis";
import { DepartmentDetail } from "./DepartmentDetail";
import { CEOBriefing } from "./CEOBriefing";

type ApprovalState = "pending" | "publishing" | "approved";
const STORAGE_KEY = "genesis-v2-visual-state";

const hotspots: Array<{ id: DepartmentId; label: string; className: string }> = [
  { id: "ceo", label: "Open CEO Command Room", className: "hotspot-ceo" },
  { id: "creative", label: "Open Creative Studio", className: "hotspot-creative" },
  { id: "commerce", label: "Open Commerce Hub", className: "hotspot-commerce" },
  { id: "finance", label: "Open Finance Centre", className: "hotspot-finance" },
  { id: "operations", label: "Open Operations Centre", className: "hotspot-operations" },
  { id: "ai-operations", label: "Open AI Operations", className: "hotspot-ai" },
];

export function CommandHQ() {
  const [selected, setSelected] = useState<DepartmentId | undefined>();
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [approvalState, setApprovalState] = useState<ApprovalState>("pending");
  const [revenue, setRevenue] = useState(721);
  const [profit, setProfit] = useState(441);
  const [activityItems, setActivityItems] = useState(initialActivities);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<{ approvalState: ApprovalState; revenue: number; profit: number; activityItems: string[] }>;
        if (parsed.approvalState) setApprovalState(parsed.approvalState);
        if (typeof parsed.revenue === "number") setRevenue(parsed.revenue);
        if (typeof parsed.profit === "number") setProfit(parsed.profit);
        if (Array.isArray(parsed.activityItems)) setActivityItems(parsed.activityItems);
      }
    } catch {}
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ approvalState, revenue, profit, activityItems }));
  }, [approvalState, revenue, profit, activityItems]);

  const departments = useMemo<Department[]>(() => initialDepartments.map((department) => {
    if (department.id !== "commerce") return department;
    if (approvalState === "publishing") return { ...department, status: "processing", activity: "Publishing Commerce Listing 014" };
    if (approvalState === "approved") return { ...department, status: "healthy", tasks: Math.max(0, department.tasks - 1), activity: "Commerce Listing 014 is live" };
    return department;
  }), [approvalState]);

  const selectedDepartment = departments.find((item) => item.id === selected);
  const hour = time.getHours();
  const phase = hour < 6 ? "night" : hour < 9 ? "dawn" : hour < 17 ? "day" : hour < 20 ? "dusk" : "night";
  const localTime = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(time);
  const localDate = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short" }).format(time);

  const approveListing = () => {
    if (approvalState !== "pending") return;
    setApprovalState("publishing");
    setActivityItems((items) => ["CEO approved Commerce Listing 014", ...items]);
    window.setTimeout(() => {
      setApprovalState("approved");
      setRevenue(758);
      setProfit(463);
      setActivityItems((items) => ["Commerce Listing 014 is now live", ...items]);
    }, 1600);
  };

  return (
    <main className={`visualGenesis phase-${phase}`}>
      <div className="sceneViewport">
        <img className="masterScene" src="/genesis-hq-master.png" alt="Genesis premium command centre" />
        <div className="timeTint" aria-hidden="true" />
        <div className="sceneScan" aria-hidden="true" />
        <div className="liveBadge"><span /> LIVE HEADQUARTERS</div>
        <button className="briefingPill" onClick={() => setBriefingOpen(true)}>
          {approvalState === "pending" ? "1 CEO DECISION" : approvalState === "publishing" ? "PUBLISHING…" : "BRIEFING READY"}
        </button>
        <div className="localClock"><strong>{localTime}</strong><span>{localDate} · LOCAL TIME</span></div>
        <div className="startupMetrics">
          <div><span>REVENUE</span><strong>£{revenue}</strong><em>+8.2% today</em></div>
          <div><span>PROFIT</span><strong>£{profit}</strong><em>+6.4% today</em></div>
          <div><span>AI AGENTS</span><strong>12</strong><em>online</em></div>
          <div><span>AUTOMATIONS</span><strong>9</strong><em>healthy</em></div>
        </div>
        {hotspots.map((hotspot) => (
          <button key={hotspot.id} className={`roomHotspot ${hotspot.className}`} aria-label={hotspot.label} onClick={() => setSelected(hotspot.id)}>
            <span>{hotspot.label.replace("Open ", "")}</span>
          </button>
        ))}
        <div className="cube cubeOne" /><div className="cube cubeTwo" /><div className="cube cubeThree" />
      </div>
      <div className="mobileNotice">Rotate your device to landscape for the full Genesis Command Centre.</div>
      <DepartmentDetail department={selectedDepartment} onClose={() => setSelected(undefined)} />
      <CEOBriefing open={briefingOpen} approvalState={approvalState} revenue={revenue} profit={profit} onApprove={approveListing} onClose={() => setBriefingOpen(false)} />
    </main>
  );
}
