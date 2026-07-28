"use client";

import type { Department, DepartmentId } from "@/data/genesis";
import { DepartmentRoom } from "./DepartmentRoom";
import { AIWorker } from "./AIWorker";
import { LivingSkyline } from "./LivingSkyline";
import { Elevator } from "./Elevator";
import { AmbientDataFlow } from "./AmbientDataFlow";

const byId = (items: Department[], id: DepartmentId) => items.find((item) => item.id === id)!;

type Props = { departments: Department[]; selected?: DepartmentId; onSelect: (id: DepartmentId) => void };

export function HeadquartersBuilding({ departments, selected, onSelect }: Props) {
  const ceo = byId(departments, "ceo");
  const ai = byId(departments, "ai-operations");
  return (
    <main className={`hqViewport ${selected ? "hasSelection" : ""}`}>
      <div className="hqLabel"><span>GENESIS COMMAND CENTRE</span><small>EARLY-STAGE AI COMPANY · LIVE OPERATING WORLD</small></div>
      <div className="buildingShell v2Shell">
        <section className="ceoCommandRoom" onClick={() => onSelect("ceo")} role="button" tabIndex={0} aria-label="Open CEO Command Room">
          <LivingSkyline />
          <header className="ceoRoomHeader"><div><span>CEO COMMAND ROOM</span><small>STRATEGY · APPROVALS · COMPANY DIRECTION</small></div><b>1 DECISION WAITING</b></header>
          <div className="ceoInterior">
            <div className="executiveWall executiveWallLeft"><span>STRATEGIC OVERVIEW</span><strong>£721</strong><small>today revenue</small><i/><i/><i/><i/></div>
            <div className="holoGlobe"><i/><b/><span/></div>
            <div className="executiveWall executiveWallRight"><span>COMPANY HEALTH</span><strong>98%</strong><small>12 agents online</small><i/><i/><i/></div>
            <div className="strategyTableV2"><span/><i/><i/><i/><i/></div>
            <div className="ceoLounge"><b/><b/><i/></div>
            <AIWorker variant={1} activity="reviewing" label="CEO strategy agent" className="ceoWorkerA" />
            <AIWorker variant={2} walking label="CEO executive agent" className="ceoWorkerB" />
            <div className="ceoFloorGlow" />
          </div>
        </section>

        <div className="lowerHeadquarters">
          <div className="roomColumn">
            <DepartmentRoom department={byId(departments, "creative")} selected={selected === "creative"} onSelect={onSelect} />
            <DepartmentRoom department={byId(departments, "finance")} selected={selected === "finance"} onSelect={onSelect} />
          </div>
          <div className="centralCore">
            <Elevator />
            <DepartmentRoom department={ai} selected={selected === "ai-operations"} onSelect={onSelect} variant="ai-core" />
          </div>
          <div className="roomColumn">
            <DepartmentRoom department={byId(departments, "commerce")} selected={selected === "commerce"} onSelect={onSelect} />
            <DepartmentRoom department={byId(departments, "operations")} selected={selected === "operations"} onSelect={onSelect} />
          </div>
        </div>
        <AmbientDataFlow />
        <div className="buildingFrame buildingFrameTop" />
        <div className="buildingFrame buildingFrameBottom" />
      </div>
    </main>
  );
}
