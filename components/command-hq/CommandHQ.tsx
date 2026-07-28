"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
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

type WorkerSpec = {
  id: string;
  className: string;
  distance: number;
  duration: number;
  delay: number;
  carry?: boolean;
  reverse?: boolean;
};

const workers: WorkerSpec[] = [
  { id: "ceo-a", className: "sceneWorker-ceo-a", distance: 105, duration: 10, delay: 0 },
  { id: "ceo-b", className: "sceneWorker-ceo-b", distance: 82, duration: 8.5, delay: 2.2, reverse: true },
  { id: "creative-a", className: "sceneWorker-creative-a", distance: 125, duration: 8, delay: .5, carry: true },
  { id: "creative-b", className: "sceneWorker-creative-b", distance: 70, duration: 7, delay: 3.1, reverse: true },
  { id: "commerce-a", className: "sceneWorker-commerce-a", distance: 110, duration: 8.8, delay: 1.2, carry: true },
  { id: "commerce-b", className: "sceneWorker-commerce-b", distance: 75, duration: 6.8, delay: 4, reverse: true },
  { id: "finance-a", className: "sceneWorker-finance-a", distance: 115, duration: 9.2, delay: 2.4 },
  { id: "operations-a", className: "sceneWorker-operations-a", distance: 118, duration: 7.8, delay: 1.7, carry: true, reverse: true },
  { id: "lift-a", className: "sceneWorker-lift-a", distance: 0, duration: 5.5, delay: 0 },
];

function MovingWorker({ spec }: { spec: WorkerSpec }) {
  const start = spec.reverse ? spec.distance : 0;
  const end = spec.reverse ? 0 : spec.distance;
  const isLift = spec.className.includes("lift");

  return (
    <motion.div
      className={`sceneWorker ${spec.className}`}
      aria-hidden="true"
      animate={isLift
        ? { y: [0, -96, -96, 0], opacity: [1, 1, .82, 1] }
        : { x: [start, end, end, start], scaleX: spec.reverse ? [-1, -1, 1, 1] : [1, 1, -1, -1] }}
      transition={{ duration: spec.duration, repeat: Infinity, ease: "easeInOut", delay: spec.delay, times: [0, .44, .56, 1] }}
    >
      <span className="sceneWorker-shadow" />
      <span className="sceneWorker-head" />
      <span className="sceneWorker-hair" />
      <span className="sceneWorker-body" />
      <span className="sceneWorker-arm sceneWorker-arm-a" />
      <span className="sceneWorker-arm sceneWorker-arm-b" />
      <span className="sceneWorker-leg sceneWorker-leg-a" />
      <span className="sceneWorker-leg sceneWorker-leg-b" />
      {spec.carry && <span className="sceneWorker-cube" />}
    </motion.div>
  );
}

export function CommandHQ() {
  const [selected, setSelected] = useState<DepartmentId | undefined>();
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [approvalState, setApprovalState] = useState<ApprovalState>("pending");
  const [revenue, setRevenue] = useState(721);
  const [profit, setProfit] = useState(441);
  const [activityItems, setActivityItems] = useState(initialActivities);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 60000);
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

        <button className="briefingPill" onClick={() => setBriefingOpen(true)}>
          {approvalState === "pending" ? "1 CEO DECISION" : approvalState === "publishing" ? "PUBLISHING…" : "BRIEFING READY"}
        </button>

        <div className="workerLayer" aria-hidden="true">
          {workers.map((worker) => <MovingWorker key={worker.id} spec={worker} />)}
        </div>

        {hotspots.map((hotspot) => (
          <button key={hotspot.id} className={`roomHotspot ${hotspot.className}`} aria-label={hotspot.label} onClick={() => setSelected(hotspot.id)}>
            <span>{hotspot.label.replace("Open ", "")}</span>
          </button>
        ))}

        <div className="cube cubeOne" />
        <div className="cube cubeTwo" />
      </div>
      <div className="mobileNotice">Rotate your device to landscape for the full Genesis Command Centre.</div>
      <DepartmentDetail department={selectedDepartment} onClose={() => setSelected(undefined)} />
      <CEOBriefing open={briefingOpen} approvalState={approvalState} revenue={revenue} profit={profit} onApprove={approveListing} onClose={() => setBriefingOpen(false)} />
    </main>
  );
}
