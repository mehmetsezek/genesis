"use client";

import { motion } from "motion/react";
import type { Department, DepartmentId } from "@/data/genesis";
import { AIWorker } from "./AIWorker";

type Props = { department: Department; onSelect: (id: DepartmentId) => void; selected: boolean; variant?: "standard" | "ai-core" };

const meta: Record<DepartmentId, { kicker: string; stat: string }> = {
  ceo: { kicker: "EXECUTIVE CONTROL", stat: "1 APPROVAL" },
  creative: { kicker: "PRODUCTION LIVE", stat: "3 RENDERS" },
  commerce: { kicker: "MARKETPLACE LIVE", stat: "6 LISTINGS" },
  finance: { kicker: "TREASURY ONLINE", stat: "65% MARGIN" },
  operations: { kicker: "WORKFLOWS STABLE", stat: "9 ACTIVE" },
  "ai-operations": { kicker: "AGENT CORE", stat: "12 ONLINE" },
};

function Interior({ id }: { id: DepartmentId }) {
  if (id === "creative") return <><div className="creativeGallery"><i/><i/><i/><i/></div><div className="deskBank creativeDesks"><b/><b/><b/></div><div className="renderWall"><span>RENDER QUEUE</span><em>82%</em></div></>;
  if (id === "commerce") return <><div className="productWall"><i/><i/><i/><i/><i/></div><div className="commerceDashboard"><span>ETSY</span><strong>£721</strong><small>4 orders today</small></div><div className="deskBank commerceDesks"><b/><b/><b/></div></>;
  if (id === "finance") return <><div className="financeWall"><span>REVENUE</span><strong>£721</strong><i/><i/><i/><i/><i/></div><div className="treasuryVault"><b/><b/><b/></div><div className="deskBank financeDesks"><b/><b/></div></>;
  if (id === "operations") return <><div className="workflowMap"><i/><i/><i/><i/><i/></div><div className="automationBoard"><span>AUTOMATIONS</span><b/><b/><b/><b/></div><div className="deskBank operationsDesks"><b/><b/></div></>;
  return <><div className="agentGrid"><i/><i/><i/><i/><i/><i/></div><div className="aiOrb"/><div className="deploymentPods"><b/><b/><b/></div></>;
}

export function DepartmentRoom({ department, onSelect, selected, variant = "standard" }: Props) {
  const info = meta[department.id];
  return (
    <motion.section
      layoutId={`room-${department.id}`}
      className={`departmentRoom room-${department.id} ${variant} status-${department.status} ${selected ? "selected" : ""}`}
      onClick={() => onSelect(department.id)}
      whileHover={{ y: -2, scale: 1.006 }}
      transition={{ duration: 0.35 }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${department.name}`}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onSelect(department.id); }}
    >
      <header className="roomHeader"><div><span>{department.shortName}</span><small>{info.kicker}</small></div><b>{info.stat}</b></header>
      <div className="roomInterior">
        <div className="ceilingLights"><i/><i/><i/><i/></div>
        <Interior id={department.id} />
        <AIWorker variant={1} activity="typing" label={`${department.name} agent one`} className="workerA" />
        <AIWorker variant={2} activity="screen" label={`${department.name} agent two`} className="workerB" />
        {department.agents >= 3 && <AIWorker variant={3} walking label={`${department.name} agent three`} className="workerC" />}
        <div className="floorReflection" />
      </div>
      <div className="roomHoverCard"><strong>{department.name}</strong><span>{department.activity}</span><small>Open workspace →</small></div>
    </motion.section>
  );
}
