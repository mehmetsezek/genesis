"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Department, DepartmentId } from "@/data/genesis";
import { activities as initialActivities, departments as initialDepartments } from "@/data/genesis";
import { DepartmentDetail } from "./DepartmentDetail";
import { CEOBriefing } from "./CEOBriefing";

type ApprovalState = "pending" | "publishing" | "approved";
const STORAGE_KEY = "genesis-v23-state";

const hotspots: Array<{ id: DepartmentId; label: string; className: string }> = [
  { id: "ceo", label: "CEO Command Room", className: "hotspot-ceo" },
  { id: "creative", label: "Creative Studio", className: "hotspot-creative" },
  { id: "commerce", label: "Commerce Hub", className: "hotspot-commerce" },
  { id: "finance", label: "Finance Centre", className: "hotspot-finance" },
  { id: "operations", label: "Operations Centre", className: "hotspot-operations" },
  { id: "ai-operations", label: "AI Operations", className: "hotspot-ai" },
];

type WorkerSpec = { id: string; className: string; distance: number; duration: number; delay: number; carry?: boolean; reverse?: boolean; state?: "walk" | "work" | "meet" };
const workers: WorkerSpec[] = [
  { id:"ceo1",className:"v23-ceo-1",distance:160,duration:13,delay:0,state:"walk" },
  { id:"ceo2",className:"v23-ceo-2",distance:105,duration:11,delay:3,reverse:true,carry:true },
  { id:"ceo3",className:"v23-ceo-3",distance:0,duration:8,delay:0,state:"work" },
  { id:"cr1",className:"v23-cr-1",distance:155,duration:10,delay:1,carry:true },
  { id:"cr2",className:"v23-cr-2",distance:90,duration:9,delay:4,reverse:true },
  { id:"co1",className:"v23-co-1",distance:150,duration:11,delay:2,carry:true,reverse:true },
  { id:"co2",className:"v23-co-2",distance:80,duration:8,delay:5 },
  { id:"fi1",className:"v23-fi-1",distance:145,duration:12,delay:2 },
  { id:"fi2",className:"v23-fi-2",distance:72,duration:9,delay:5,reverse:true },
  { id:"op1",className:"v23-op-1",distance:150,duration:10,delay:1,carry:true },
  { id:"op2",className:"v23-op-2",distance:86,duration:8,delay:4,reverse:true },
  { id:"lift",className:"v23-lift",distance:0,duration:10,delay:0 },
];

function Worker({ spec }: { spec: WorkerSpec }) {
  const lift = spec.className.includes("lift");
  const start = spec.reverse ? spec.distance : 0;
  const end = spec.reverse ? 0 : spec.distance;
  return <motion.div className={`v23-worker ${spec.className}`} aria-hidden="true"
    animate={lift ? { y:[0,-214,-214,0],opacity:[1,1,.8,1] } : spec.state === "work" ? { y:[0,-2,0], rotate:[0,1,0] } : { x:[start,end,end,start], scaleX: spec.reverse ? [-1,-1,1,1] : [1,1,-1,-1] }}
    transition={{ duration:spec.duration,repeat:Infinity,ease:"easeInOut",delay:spec.delay,times:lift||spec.state!=="work"?[0,.44,.56,1]:undefined }}>
    <span className="v23-shadow"/><span className="v23-head"/><span className="v23-hair"/><span className="v23-torso"/><span className="v23-arm a"/><span className="v23-arm b"/><span className="v23-leg a"/><span className="v23-leg b"/>{spec.carry&&<span className="v23-carry"/>}
  </motion.div>;
}

export function CommandHQ(){
 const [selected,setSelected]=useState<DepartmentId>(); const [briefingOpen,setBriefingOpen]=useState(false); const [approvalState,setApprovalState]=useState<ApprovalState>("pending"); const [revenue,setRevenue]=useState(721); const [profit,setProfit]=useState(441); const [activityItems,setActivityItems]=useState(initialActivities); const [time,setTime]=useState(new Date());
 useEffect(()=>{const id=setInterval(()=>setTime(new Date()),1000);try{const saved=localStorage.getItem(STORAGE_KEY);if(saved){const p=JSON.parse(saved);if(p.approvalState)setApprovalState(p.approvalState);if(typeof p.revenue==="number")setRevenue(p.revenue);if(typeof p.profit==="number")setProfit(p.profit);if(Array.isArray(p.activityItems))setActivityItems(p.activityItems)}}catch{}return()=>clearInterval(id)},[]);
 useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify({approvalState,revenue,profit,activityItems}))},[approvalState,revenue,profit,activityItems]);
 const departments=useMemo<Department[]>(()=>initialDepartments.map(d=>d.id!=="commerce"?d:approvalState==="publishing"?{...d,status:"processing",activity:"Publishing Commerce Listing 014"}:approvalState==="approved"?{...d,status:"healthy",tasks:Math.max(0,d.tasks-1),activity:"Commerce Listing 014 is live"}:d),[approvalState]);
 const selectedDepartment=departments.find(d=>d.id===selected); const hour=time.getHours(); const phase=hour<6?"night":hour<9?"dawn":hour<17?"day":hour<20?"dusk":"night";
 const approveListing=()=>{if(approvalState!=="pending")return;setApprovalState("publishing");setActivityItems(i=>["CEO approved Commerce Listing 014",...i]);setTimeout(()=>{setApprovalState("approved");setRevenue(758);setProfit(463);setActivityItems(i=>["Commerce Listing 014 is now live",...i])},1600)};
 return <main className={`genesisV23 phase-${phase}`}>
   <header className="v23-topbar"><div className="v23-brand"><b>GENESIS</b><span>COMMAND HQ</span></div><div className="v23-metric"><small>REVENUE</small><strong>£{revenue}</strong><em>+8.2% today</em></div><div className="v23-metric"><small>PROFIT</small><strong>£{profit}</strong><em>+6.4% today</em></div><div className="v23-metric"><small>ACTIVE AGENTS</small><strong>12</strong><em>2 coordinating</em></div><div className="v23-metric"><small>AUTOMATIONS</small><strong>9</strong><em>all operational</em></div><button className="v23-brief" onClick={()=>setBriefingOpen(true)}>{approvalState==="pending"?"1 DECISION WAITING":approvalState==="publishing"?"PUBLISHING…":"BRIEFING READY"}</button><div className="v23-time"><strong>{time.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</strong><span>{time.toLocaleDateString([], {weekday:"short",day:"2-digit",month:"short"})}</span></div></header>
   <div className="v23-shell"><nav className="v23-nav"><b>COMMAND HQ</b>{hotspots.slice(1).map(h=><button key={h.id} onClick={()=>setSelected(h.id)}>{h.label}</button>)}</nav>
   <section className="v23-stage"><img src="/genesis-hq-clean.svg" alt="Genesis headquarters cutaway"/><div className="v23-time-tint"/>
    <div className="v23-workers">{workers.map(w=><Worker key={w.id} spec={w}/>)}</div>
    {hotspots.map(h=><button key={h.id} className={`v23-room ${h.className}`} onClick={()=>setSelected(h.id)}><span>{h.label}</span></button>)}
    <motion.div className="v23-cube c1" animate={{x:[0,430,790],y:[0,0,230],rotate:[0,180,360]}} transition={{duration:12,repeat:Infinity,ease:"easeInOut"}}/><motion.div className="v23-cube c2" animate={{x:[0,-390,-390],y:[0,0,225],rotate:[0,-180,-360]}} transition={{duration:14,repeat:Infinity,ease:"easeInOut",delay:2}}/>
   </section>
   <aside className="v23-activity"><h3>LIVE ACTIVITY</h3>{activityItems.slice(0,7).map((a,i)=><div key={`${a}-${i}`}><i/><span>{a}</span><small>{i===0?"Just now":`${i+1} min ago`}</small></div>)}</aside></div>
   <DepartmentDetail department={selectedDepartment} onClose={()=>setSelected(undefined)}/><CEOBriefing open={briefingOpen} approvalState={approvalState} revenue={revenue} profit={profit} onApprove={approveListing} onClose={()=>setBriefingOpen(false)}/>
 </main>
}
