"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Department } from "@/data/genesis";

type Props = { department?: Department; onClose: () => void };

export function DepartmentDetail({ department, onClose }: Props) {
  return (
    <AnimatePresence>
      {department && (
        <motion.div className="departmentOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section
            className="departmentDetail"
            layoutId={`room-${department.id}`}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="closeDetail" onClick={onClose} type="button">← Return to HQ</button>
            <div className="detailTitle">
              <div>
                <span>DEPARTMENT</span>
                <h2>{department.name}</h2>
                <p>{department.detail}</p>
              </div>
              <div className={`detailStatus status-${department.status}`}>{department.status}</div>
            </div>
            <div className="detailGrid">
              <article><span>ACTIVE AGENTS</span><strong>{department.agents}</strong><small>All assigned</small></article>
              <article><span>OPEN TASKS</span><strong>{department.tasks}</strong><small>2 completing today</small></article>
              <article><span>CURRENT ACTIVITY</span><strong className="activityText">{department.activity}</strong><small>Live operational state</small></article>
            </div>
            <div className="workspaceMock">
              <div className="workspaceHeader"><strong>Live workspace</strong><span>Prototype data</span></div>
              {["Priority execution", "Agent coordination", "Output review"].map((item, index) => (
                <div className="taskRow" key={item}>
                  <span className="taskNumber">0{index + 1}</span>
                  <div><strong>{item}</strong><small>{index === 0 ? department.activity : "Queued behind current workflow"}</small></div>
                  <i>{index === 0 ? "IN PROGRESS" : "QUEUED"}</i>
                </div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
