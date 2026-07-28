export type DepartmentId =
  | "ceo"
  | "ai-operations"
  | "creative"
  | "commerce"
  | "finance"
  | "operations";

export type Department = {
  id: DepartmentId;
  name: string;
  shortName: string;
  floor: "top" | "middle" | "ground";
  side: "left" | "right";
  status: "healthy" | "attention" | "processing";
  agents: number;
  tasks: number;
  detail: string;
  activity: string;
};

export const metrics = [
  { label: "Revenue", value: "£684", trend: "+8.2% today" },
  { label: "Profit", value: "£419", trend: "+6.4% today" },
  { label: "Active Agents", value: "12", trend: "2 coordinating" },
  { label: "Automations", value: "9", trend: "all operational" },
  { label: "System Health", value: "98%", trend: "stable" },
  { label: "Global Balance", value: "£8,460", trend: "+£419 today" },
];

export const departments: Department[] = [
  {
    id: "ceo",
    name: "CEO Command Room",
    shortName: "CEO",
    floor: "top",
    side: "left",
    status: "healthy",
    agents: 2,
    tasks: 3,
    detail: "Strategy, approvals and company direction.",
    activity: "Reviewing the Q3 product expansion plan",
  },
  {
    id: "ai-operations",
    name: "AI Operations",
    shortName: "AI OPERATIONS",
    floor: "ground",
    side: "right",
    status: "processing",
    agents: 3,
    tasks: 7,
    detail: "Agent monitoring, deployment and diagnostics.",
    activity: "Deploying one commerce research agent",
  },
  {
    id: "creative",
    name: "Creative",
    shortName: "CREATIVE",
    floor: "middle",
    side: "left",
    status: "healthy",
    agents: 2,
    tasks: 4,
    detail: "Design, content, video and brand production.",
    activity: "Finishing three product mock-ups",
  },
  {
    id: "commerce",
    name: "Commerce",
    shortName: "COMMERCE",
    floor: "middle",
    side: "right",
    status: "attention",
    agents: 3,
    tasks: 6,
    detail: "Products, listings, marketplaces and orders.",
    activity: "One listing is waiting for approval",
  },
  {
    id: "finance",
    name: "Finance",
    shortName: "FINANCE",
    floor: "ground",
    side: "left",
    status: "healthy",
    agents: 2,
    tasks: 2,
    detail: "Revenue, profit, expenses and forecasting.",
    activity: "Recording £74 in new revenue",
  },
  {
    id: "operations",
    name: "Operations",
    shortName: "OPERATIONS",
    floor: "ground",
    side: "right",
    status: "healthy",
    agents: 3,
    tasks: 5,
    detail: "Workflow execution, routing and fulfilment.",
    activity: "Workflow 04 restarted successfully",
  },
];

export const activities = [
  "Creative completed 3 product mock-ups",
  "Commerce published a new Etsy listing",
  "Finance recorded £74 revenue",
  "Operations restarted Workflow 04",
  "AI Operations deployed NOVA-12",
];
