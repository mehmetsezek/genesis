"use client";

import { motion } from "motion/react";
import type { Department, DepartmentId } from "@/data/genesis";
import { AIWorker } from "./AIWorker";

type Props = { department: Department; onSelect: (id: DepartmentId) => void; selected: boolean };

const screenTitles: Record<DepartmentId, string> = {
  ceo: "STRATEGY",
  "ai-operations": "AGENT GRID",
  creative: "RENDER QUEUE",
  commerce: "MARKET LIVE",
  finance: "CASHFLOW",
  operations: "WORKFLOWS",
};

export function DepartmentRoom({ department, onSelect, selected }: Props) {
  const isBusy = department.status === "processing" || department.id === "creative" || department.id === "operations";
  return (
    <motion.section
      layoutId={`room-${department.id}`}
      className={`departmentRoom ${department.id} status-${department.status} ${selected ? "selected" : ""} ${isBusy ? "roomBusy" : ""}`}
      onClick={() => onSelect(department.id)}
      whileHover={{ scale: 1.006 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${department.name}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect(department.id);
      }}
    >
      <div className="roomHeader">
        <span>{department.shortName}</span>
        <i aria-hidden="true" />
      </div>
      <div className="roomInterior">
        <div className="wallScreen">
          <span className="screenTitle">{screenTitles[department.id]}</span>
          <div className="screenGraph"><i /><i /><i /><i /><i /></div>
          <span className="screenSweep" />
        </div>
        <div className="desk deskOne"><span /></div>
        <div className="desk deskTwo"><span /></div>
        {department.id === "creative" && <div className="creativeBoard"><i /><i /><i /></div>}
        {department.id === "finance" && <div className="financeTicker">£ +37</div>}
        {department.id === "operations" && <div className="workflowNode"><i /><i /><i /></div>}
        {department.agents >= 2 && <AIWorker variant={1} activity="typing" label={`${department.name} agent one`} />}
        {department.agents >= 2 && <AIWorker variant={2} activity="screen" label={`${department.name} agent two`} />}
        {department.agents >= 3 && <AIWorker variant={3} walking activity="walking" label={`${department.name} agent three`} />}
        <div className="roomGlow" />
        <motion.div className="roomActivityPulse" animate={{ opacity: [0.1, .48, .1] }} transition={{ duration: 5 + department.agents, repeat: Infinity, delay: department.agents }} />
      </div>
      <div className="roomPopover">
        <strong>{department.name}</strong>
        <p>{department.agents} agents active · {department.tasks} tasks</p>
        <small>{department.activity}</small>
        <span>Open department →</span>
      </div>
    </motion.section>
  );
}
