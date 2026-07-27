"use client";

import { motion } from "motion/react";
import type { Department, DepartmentId } from "@/data/genesis";
import { AIWorker } from "./AIWorker";

type Props = { department: Department; onSelect: (id: DepartmentId) => void; selected: boolean };

export function DepartmentRoom({ department, onSelect, selected }: Props) {
  return (
    <motion.section
      layoutId={`room-${department.id}`}
      className={`departmentRoom ${department.id} status-${department.status} ${selected ? "selected" : ""}`}
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
          <span className="screenTitle">{department.id === "ceo" ? "STRATEGY" : "LIVE SYSTEMS"}</span>
          <div className="screenGraph"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="desk deskOne"><span /></div>
        <div className="desk deskTwo"><span /></div>
        {department.agents >= 2 && <AIWorker variant={1} label={`${department.name} agent one`} />}
        {department.agents >= 2 && <AIWorker variant={2} label={`${department.name} agent two`} />}
        {department.agents >= 3 && <AIWorker variant={3} walking={department.id === "operations"} label={`${department.name} agent three`} />}
        <div className="roomGlow" />
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
