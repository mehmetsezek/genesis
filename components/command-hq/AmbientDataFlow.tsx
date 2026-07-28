"use client";

import { DataCube } from "./DataCube";

export function AmbientDataFlow() {
  return (
    <div className="ambientDataFlow" aria-hidden="true">
      <div className="dataLane laneMiddle" />
      <div className="dataLane laneGround" />
      <div className="dataLane laneVertical" />
      <DataCube route="creative-commerce" delay={.4} />
      <DataCube route="operations-finance" delay={3.1} />
      <DataCube route="ai-commerce" delay={5.4} />
    </div>
  );
}
