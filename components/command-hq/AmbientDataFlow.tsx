"use client";

import { DataCube } from "./DataCube";

export function AmbientDataFlow() {
  return (
    <div className="ambientDataFlow" aria-hidden="true">
      <DataCube route="creative-commerce" delay={1.5} />
      <DataCube route="operations-finance" delay={8} />
      <DataCube route="ai-commerce" delay={13} />
    </div>
  );
}
