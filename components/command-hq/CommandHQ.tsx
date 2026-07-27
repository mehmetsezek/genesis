"use client";

import { useMemo, useState } from "react";
import type { DepartmentId } from "@/data/genesis";
import { departments } from "@/data/genesis";
import { TopMetrics } from "@/components/hud/TopMetrics";
import { LeftNavigation } from "@/components/hud/LeftNavigation";
import { ActivityPanel } from "@/components/hud/ActivityPanel";
import { BottomNavigation } from "@/components/hud/BottomNavigation";
import { HeadquartersBuilding } from "./HeadquartersBuilding";
import { DepartmentDetail } from "./DepartmentDetail";
import { CEOBriefing } from "./CEOBriefing";

export function CommandHQ() {
  const [selected, setSelected] = useState<DepartmentId | undefined>();
  const [briefingOpen, setBriefingOpen] = useState(false);
  const selectedDepartment = useMemo(() => departments.find((item) => item.id === selected), [selected]);

  return (
    <div className="genesisApp">
      <div className="matrixRain" aria-hidden="true" /><div className="digitalFog" aria-hidden="true" />
      <TopMetrics /><LeftNavigation /><ActivityPanel onOpenBriefing={() => setBriefingOpen(true)} />
      <HeadquartersBuilding selected={selected} onSelect={setSelected} /><BottomNavigation />
      <DepartmentDetail department={selectedDepartment} onClose={() => setSelected(undefined)} />
      <CEOBriefing open={briefingOpen} onClose={() => setBriefingOpen(false)} />
    </div>
  );
}
