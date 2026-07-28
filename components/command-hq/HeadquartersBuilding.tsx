"use client";

import type { Department, DepartmentId } from "@/data/genesis";
import { DepartmentRoom } from "./DepartmentRoom";
import { Elevator } from "./Elevator";
import { AmbientDataFlow } from "./AmbientDataFlow";
import { LivingSkyline } from "./LivingSkyline";

type DayPhase = "dawn" | "day" | "dusk" | "night";
type Props = { departments: Department[]; selected?: DepartmentId; onSelect: (id: DepartmentId) => void; phase: DayPhase };

export function HeadquartersBuilding({ departments, selected, onSelect, phase }: Props) {
  const get = (id: DepartmentId) => departments.find((d) => d.id === id)!;
  const room = (id: DepartmentId) => (
    <DepartmentRoom department={get(id)} selected={selected === id} onSelect={onSelect} />
  );

  return (
    <main className={`hqViewport ${selected ? "hasSelection" : ""}`}>
      <div className="hqLabel"><span>GENESIS COMMAND CENTRE</span><small>LIVE COMPANY OPERATING SYSTEM</small></div>
      <div className={`buildingShell phase-${phase}`}>
        <LivingSkyline phase={phase} />
        <div className="buildingFrameGlow" />
        <div className="ceoFloor">{room("ceo")}</div>
        <div className="middleFloor">
          {room("creative")}
          <div className="liftVoid"><Elevator /></div>
          {room("commerce")}
        </div>
        <div className="groundFloor">
          {room("finance")}
          {room("ai-operations")}
          {room("operations")}
        </div>
        <AmbientDataFlow />
        <div className="buildingCap" />
        <div className="buildingBase" />
      </div>
    </main>
  );
}
