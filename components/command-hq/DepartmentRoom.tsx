"use client";

import { motion } from "motion/react";
import type { Department, DepartmentId } from "@/data/genesis";
import { AIWorker } from "./AIWorker";

type Props = { department: Department; onSelect: (id: DepartmentId) => void; selected: boolean };

const roomMeta: Record<DepartmentId, { screen: string; status: string }> = {
  ceo: { screen: "STRATEGY MAP", status: "REVIEWING" },
  "ai-operations": { screen: "AGENT GRID", status: "DEPLOYING" },
  creative: { screen: "RENDER QUEUE", status: "CREATING" },
  commerce: { screen: "MARKET LIVE", status: "PUBLISHING" },
  finance: { screen: "CASHFLOW", status: "RECONCILING" },
  operations: { screen: "WORKFLOWS", status: "ROUTING" },
};

function DepartmentFurniture({ id }: { id: DepartmentId }) {
  if (id === "ceo") {
    return <>
      <div className="strategyTable"><i /><i /><i /><i /></div>
      <div className="executiveDesk" />
      <div className="approvalPedestal"><span>1</span></div>
    </>;
  }
  if (id === "ai-operations") {
    return <>
      <div className="monitorWall"><i /><i /><i /><i /><i /><i /></div>
      <div className="opsConsole consoleA" /><div className="opsConsole consoleB" />
      <div className="agentPod"><i /><i /><i /></div>
    </>;
  }
  if (id === "creative") {
    return <>
      <div className="creativeCanvas"><span /><span /><span /></div>
      <div className="editSuite"><i /><i /></div>
      <div className="mockupTable"><b /><b /><b /></div>
    </>;
  }
  if (id === "commerce") {
    return <>
      <div className="marketWall"><i /><i /><i /><i /></div>
      <div className="productTable"><b /><b /><b /></div>
      <div className="orderTower"><span>12</span><i /><i /><i /></div>
    </>;
  }
  if (id === "finance") {
    return <>
      <div className="financeBoard"><span>£721</span><i /><i /><i /><i /></div>
      <div className="forecastTable"><b /><b /><b /></div>
      <div className="secureCabinet"><i /><i /><i /></div>
    </>;
  }
  return <>
    <div className="workflowWall"><i /><i /><i /><i /><i /></div>
    <div className="routingTable"><b /><b /><b /><b /></div>
    <div className="automationRack"><span /><span /><span /><span /></div>
  </>;
}

export function DepartmentRoom({ department, onSelect, selected }: Props) {
  const meta = roomMeta[department.id];
  return (
    <motion.section
      layoutId={`room-${department.id}`}
      className={`departmentRoom room-${department.id} status-${department.status} ${selected ? "selected" : ""}`}
      onClick={() => onSelect(department.id)}
      whileHover={{ scale: 1.008 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${department.name}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect(department.id);
      }}
    >
      <div className="roomHeader"><span>{department.shortName}</span><i aria-hidden="true" /></div>
      <div className="roomStatusStrip"><span>{meta.status}</span><b>{department.tasks} TASKS</b></div>
      <div className="roomInterior">
        <div className="roomBacklight" />
        <div className="wallScreen primaryRoomScreen">
          <span className="screenTitle">{meta.screen}</span>
          <div className="screenGraph"><i /><i /><i /><i /><i /></div>
          <span className="screenSweep" />
        </div>
        <DepartmentFurniture id={department.id} />
        <AIWorker variant={1} activity="typing" label={`${department.name} agent one`} />
        <AIWorker variant={2} activity="screen" label={`${department.name} agent two`} />
        {department.agents >= 3 && <AIWorker variant={3} walking activity="walking" label={`${department.name} agent three`} />}
        <div className="roomGlow" />
        <motion.div className="roomActivityPulse" animate={{ opacity: [0.15, .9, .15], scaleX: [.5, 1, .5] }} transition={{ duration: 3.2 + department.agents * .35, repeat: Infinity, delay: department.agents * .3 }} />
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
