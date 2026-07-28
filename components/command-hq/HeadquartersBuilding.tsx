"use client";

import type { Department, DepartmentId } from "@/data/genesis";
import { DepartmentRoom } from "./DepartmentRoom";
import { Elevator } from "./Elevator";
import { AmbientDataFlow } from "./AmbientDataFlow";

type Props = { departments: Department[]; selected?: DepartmentId; onSelect: (id: DepartmentId) => void };

export function HeadquartersBuilding({ departments, selected, onSelect }: Props) {
  const room = (floor: string, side: string) => departments.find((d) => d.floor === floor && d.side === side)!;
  return (
    <main className={`hqViewport ${selected ? "hasSelection" : ""}`}>
      <div className="hqLabel"><span>GENESIS COMMAND HQ</span><small>STARTUP OPERATING MODE</small></div>
      <div className="buildingShell">
        {(["top", "middle", "ground"] as const).map((floor) => (
          <div className="buildingFloor" key={floor}>
            <DepartmentRoom department={room(floor, "left")} selected={selected === room(floor, "left").id} onSelect={onSelect} />
            <DepartmentRoom department={room(floor, "right")} selected={selected === room(floor, "right").id} onSelect={onSelect} />
          </div>
        ))}
        <Elevator />
        <AmbientDataFlow />
        <div className="buildingCap" />
        <div className="buildingBase" />
      </div>
    </main>
  );
}
