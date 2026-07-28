"use client";

import { useEffect, useMemo, useState } from "react";
import type { Department, DepartmentId } from "@/data/genesis";
import { activities as initialActivities, departments as initialDepartments } from "@/data/genesis";
import { TopMetrics } from "@/components/hud/TopMetrics";
import { LeftNavigation } from "@/components/hud/LeftNavigation";
import { ActivityPanel } from "@/components/hud/ActivityPanel";
import { BottomNavigation } from "@/components/hud/BottomNavigation";
import { HeadquartersBuilding } from "./HeadquartersBuilding";
import { DepartmentDetail } from "./DepartmentDetail";
import { CEOBriefing } from "./CEOBriefing";

type ApprovalState = "pending" | "publishing" | "approved";

const STORAGE_KEY = "genesis-v1-2-state";

export function CommandHQ() {
  const [selected, setSelected] = useState<DepartmentId | undefined>();
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [approvalState, setApprovalState] = useState<ApprovalState>("pending");
  const [revenue, setRevenue] = useState(684);
  const [profit, setProfit] = useState(419);
  const [activityItems, setActivityItems] = useState(initialActivities);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          approvalState?: ApprovalState;
          revenue?: number;
          profit?: number;
          activityItems?: string[];
        };
        if (parsed.approvalState) setApprovalState(parsed.approvalState);
        if (typeof parsed.revenue === "number") setRevenue(parsed.revenue);
        if (typeof parsed.profit === "number") setProfit(parsed.profit);
        if (Array.isArray(parsed.activityItems)) setActivityItems(parsed.activityItems);
      }
    } catch {
      // Ignore invalid local state and continue with safe defaults.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ approvalState, revenue, profit, activityItems }),
    );
  }, [approvalState, revenue, profit, activityItems, hydrated]);

  const departments = useMemo<Department[]>(
    () =>
      initialDepartments.map((department) => {
        if (department.id !== "commerce") return department;
        if (approvalState === "pending") return department;
        if (approvalState === "publishing") {
          return {
            ...department,
            status: "processing",
            activity: "Publishing Commerce Listing 014",
          };
        }
        return {
          ...department,
          status: "healthy",
          tasks: Math.max(0, department.tasks - 1),
          activity: "Commerce Listing 014 is live",
        };
      }),
    [approvalState],
  );

  const selectedDepartment = useMemo(
    () => departments.find((item) => item.id === selected),
    [departments, selected],
  );

  const approveListing = () => {
    if (approvalState !== "pending") return;
    setApprovalState("publishing");
    setActivityItems((items) => ["CEO approved Commerce Listing 014", ...items.filter((item) => !item.includes("published a new Etsy listing"))]);

    window.setTimeout(() => {
      setApprovalState("approved");
      setRevenue(721);
      setProfit(441);
      setActivityItems((items) => ["Commerce Listing 014 is now live", ...items]);
    }, 1800);
  };

  return (
    <div className="genesisApp">
      <div className="matrixRain" aria-hidden="true" />
      <div className="digitalFog" aria-hidden="true" />
      <TopMetrics revenue={revenue} profit={profit} />
      <LeftNavigation />
      <ActivityPanel
        approvalState={approvalState}
        activities={activityItems}
        onOpenBriefing={() => setBriefingOpen(true)}
      />
      <HeadquartersBuilding departments={departments} selected={selected} onSelect={setSelected} />
      <BottomNavigation />
      <DepartmentDetail department={selectedDepartment} onClose={() => setSelected(undefined)} />
      <CEOBriefing
        open={briefingOpen}
        approvalState={approvalState}
        revenue={revenue}
        profit={profit}
        onApprove={approveListing}
        onClose={() => setBriefingOpen(false)}
      />
    </div>
  );
}
