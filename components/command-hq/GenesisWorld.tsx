"use client";

import { useEffect, useMemo, useState } from "react";

type DepartmentId = "ceo" | "ai" | "creative" | "commerce" | "finance" | "operations";

type Department = {
  id: DepartmentId;
  name: string;
  subtitle: string;
  status: string;
  metric: string;
  detail: string;
};

const departments: Department[] = [
  { id: "ceo", name: "CEO COMMAND", subtitle: "Executive strategy", status: "BRIEFING READY", metric: "3 approvals", detail: "Strategy, approvals and company direction." },
  { id: "ai", name: "AI OPERATIONS", subtitle: "Agent command core", status: "12 AGENTS ONLINE", metric: "99.8% health", detail: "Agent deployment, monitoring and model operations." },
  { id: "creative", name: "CREATIVE", subtitle: "Product studio", status: "4 ASSETS RENDERING", metric: "18 tasks", detail: "Design, content, product imagery and brand production." },
  { id: "commerce", name: "COMMERCE", subtitle: "Marketplace control", status: "7 PRODUCTS LIVE", metric: "£721 today", detail: "Listings, orders, pricing and marketplace performance." },
  { id: "finance", name: "FINANCE", subtitle: "Treasury & forecast", status: "RECONCILED", metric: "£4,320 MTD", detail: "Revenue, costs, forecasts and financial control." },
  { id: "operations", name: "OPERATIONS", subtitle: "Workflow command", status: "23 FLOWS RUNNING", metric: "0 blocked", detail: "Automations, integrations and task routing." },
];

const activities = [
  "Creative completed a new digital product cover",
  "Commerce published 2 marketplace listings",
  "Finance reconciled today's transactions",
  "AI Operations deployed NOVA-12",
  "Operations completed 14 automated tasks",
];

function useLocalPhase() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const hour = now.getHours();
  const phase = hour < 6 ? "night" : hour < 9 ? "dawn" : hour < 17 ? "day" : hour < 20 ? "dusk" : "night";
  return { now, phase };
}

function Worker({ x, y, delay = 0, task = "working", direction = 1 }: { x: number; y: number; delay?: number; task?: string; direction?: number }) {
  return (
    <g className={`worldWorker ${task}`} style={{ animationDelay: `${delay}s` }} transform={`translate(${x} ${y}) scale(${direction},1)`}>
      <ellipse cx="0" cy="20" rx="12" ry="3" className="workerShadowSvg" />
      <circle cx="0" cy="-8" r="5.5" className="workerHeadSvg" />
      <path d="M-5 -2 Q0 -6 5 -2 L6 12 Q0 16 -6 12Z" className="workerBodySvg" />
      <path d="M-4 11 L-6 22 M4 11 L7 22" className="workerLimbSvg" />
      <path d="M-5 2 L-12 10 M5 2 L11 8" className="workerLimbSvg workerArmSvg" />
      {task === "carrying" && <rect x="9" y="4" width="7" height="7" rx="1" className="carriedCubeSvg" />}
      {task === "screen" && <rect x="8" y="1" width="10" height="7" rx="1" className="workerScreenSvg" />}
    </g>
  );
}

function MovingWorker({ path, delay, task = "carrying" }: { path: string; delay: number; task?: string }) {
  return (
    <g className="movingWorker">
      <g transform="scale(.9)">
        <ellipse cx="0" cy="20" rx="12" ry="3" className="workerShadowSvg" />
        <circle cx="0" cy="-8" r="5.5" className="workerHeadSvg" />
        <path d="M-5 -2 Q0 -6 5 -2 L6 12 Q0 16 -6 12Z" className="workerBodySvg" />
        <path d="M-4 11 L-6 22 M4 11 L7 22" className="workerLimbSvg walkingLegs" />
        <path d="M-5 2 L-12 10 M5 2 L11 8" className="workerLimbSvg walkingArms" />
        {task === "carrying" && <rect x="9" y="4" width="7" height="7" rx="1" className="carriedCubeSvg" />}
      </g>
      <animateMotion dur="16s" begin={`${delay}s`} repeatCount="indefinite" path={path} rotate="auto" />
    </g>
  );
}

function DataPulse({ path, delay, tone = "green" }: { path: string; delay: number; tone?: string }) {
  return (
    <g className={`dataPulse ${tone}`}>
      <rect x="-5" y="-5" width="10" height="10" rx="2" />
      <animateMotion dur="10s" begin={`${delay}s`} repeatCount="indefinite" path={path} rotate="auto" />
    </g>
  );
}

export function GenesisWorld() {
  const { now, phase } = useLocalPhase();
  const [selected, setSelected] = useState<Department | null>(null);
  const [activityOpen, setActivityOpen] = useState(true);
  const time = useMemo(() => now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), [now]);
  const date = useMemo(() => now.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "short" }), [now]);

  return (
    <main className={`genesisWorld phase-${phase}`}>
      <div className="worldBackdrop" aria-hidden="true"><span /><span /><span /></div>

      <header className="worldTopbar">
        <div className="worldBrand"><b>G</b><div><strong>GENESIS</strong><small>COMMAND HQ · V2 REBUILD</small></div></div>
        <div className="worldMetrics">
          <article><span>Revenue today</span><strong>£721</strong><small>+18.4%</small></article>
          <article><span>Monthly profit</span><strong>£3,180</strong><small>Target £15,000</small></article>
          <article><span>AI workforce</span><strong>12 / 15</strong><small>3 desks available</small></article>
          <article><span>Active tasks</span><strong>23</strong><small>0 blocked</small></article>
          <article className="worldClock"><span>{date}</span><strong>{time}</strong><small>{phase.toUpperCase()} MODE</small></article>
        </div>
      </header>

      <aside className="worldLeftRail">
        <button className="active">HQ</button>
        {departments.map((d) => <button key={d.id} onClick={() => setSelected(d)}>{d.name.split(" ")[0]}</button>)}
        <div className="worldGoal"><span>MONTHLY GOAL</span><b>21%</b><i><em /></i><small>£3,180 / £15,000</small></div>
      </aside>

      <section className="worldStage" aria-label="Interactive Genesis headquarters">
        <div className="stageTitle"><span>GENESIS COMMAND CENTRE</span><small>Living company view · select any department</small></div>
        <svg className="hqScene" viewBox="0 0 1280 760" role="img" aria-label="Premium three-floor headquarters cutaway">
          <defs>
            <linearGradient id="steel" x1="0" x2="1"><stop offset="0" stopColor="#0b1110"/><stop offset=".45" stopColor="#29322e"/><stop offset="1" stopColor="#070b0a"/></linearGradient>
            <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8a6845"/><stop offset="1" stopColor="#2c2118"/></linearGradient>
            <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#25423b" stopOpacity=".9"/><stop offset="1" stopColor="#07110e" stopOpacity=".92"/></linearGradient>
            <radialGradient id="roomGlow"><stop stopColor="#ffc878" stopOpacity=".2"/><stop offset="1" stopColor="#050807" stopOpacity="0"/></radialGradient>
            <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000" floodOpacity=".75"/></filter>
          </defs>

          <g className="distantCity">
            {Array.from({ length: 26 }).map((_, i) => <rect key={i} x={i * 52 - 12} y={105 + (i % 5) * 22} width={28 + (i % 3) * 7} height={170 - (i % 4) * 20} rx="2" />)}
          </g>

          <path className="buildingOuter" d="M116 115 L1164 115 L1215 170 L1215 690 L1164 730 L116 730 L65 690 L65 170Z" fill="url(#steel)" filter="url(#shadow)" />
          <path className="buildingEdge" d="M116 126 L1157 126 L1202 173 L1202 680 L1157 716 L116 716 L78 680 L78 174Z" />

          <g className="floorSlab"><rect x="83" y="334" width="1114" height="18"/><rect x="83" y="525" width="1114" height="18"/></g>
          <g className="verticalCore"><rect x="596" y="142" width="90" height="558" rx="4"/><rect x="610" y="154" width="62" height="533" rx="3"/></g>
          <g className="liftCar"><rect x="616" y="402" width="50" height="75" rx="3"/><line x1="641" y1="402" x2="641" y2="477"/><circle cx="641" cy="392" r="10"/><text x="641" y="396" textAnchor="middle">2</text></g>

          <g className="room roomCeo" onClick={() => setSelected(departments[0])} tabIndex={0} role="button">
            <rect x="95" y="145" width="1080" height="174" rx="6" className="roomBase"/>
            <rect x="111" y="157" width="1060" height="148" rx="4" className="roomGlass"/>
            <rect x="135" y="174" width="260" height="83" rx="4" className="windowWall"/>
            <path d="M140 244 L210 190 L270 226 L338 178 L389 221" className="skylineLine"/>
            <g className="strategyTableSvg"><ellipse cx="640" cy="257" rx="143" ry="34"/><ellipse cx="640" cy="249" rx="112" ry="21"/><circle cx="640" cy="220" r="33" className="holoSphere"/><path d="M615 220 Q640 195 665 220 Q640 246 615 220Z"/><path d="M640 187 L640 253 M607 220 L673 220"/></g>
            <g className="ceoDeskSvg"><rect x="893" y="229" width="177" height="13" rx="3"/><rect x="918" y="242" width="10" height="42"/><rect x="1037" y="242" width="10" height="42"/><rect x="930" y="197" width="106" height="29" rx="3"/></g>
            <g className="approvalBay"><rect x="190" y="263" width="158" height="28" rx="4"/><circle cx="217" cy="277" r="9"/><text x="242" y="281">3 APPROVALS</text></g>
            <text x="115" y="170" className="roomTitle">CEO COMMAND ROOM</text><text x="115" y="189" className="roomSub">Executive strategy · company direction</text>
            <Worker x={465} y={278} task="screen"/><Worker x={815} y={278} delay={1.2}/><Worker x={1005} y={277} task="working" direction={-1}/>
          </g>

          <g className="room roomCreative" onClick={() => setSelected(departments[2])} tabIndex={0} role="button">
            <rect x="95" y="364" width="486" height="146" rx="6" className="roomBase"/><rect x="109" y="377" width="458" height="120" rx="4" className="roomGlass"/>
            <rect x="130" y="393" width="132" height="61" rx="3" className="creativeWall"/><circle cx="172" cy="423" r="22"/><rect x="195" y="405" width="45" height="35" rx="18"/>
            <g className="deskRow"><rect x="295" y="449" width="210" height="10"/><rect x="310" y="459" width="8" height="27"/><rect x="483" y="459" width="8" height="27"/><rect x="324" y="419" width="64" height="27"/><rect x="407" y="419" width="64" height="27"/></g>
            <text x="119" y="390" className="roomTitle">CREATIVE STUDIO</text><text x="119" y="408" className="roomSub">4 assets rendering</text>
            <Worker x={282} y={473} task="carrying" delay={.4}/><Worker x={395} y={473} task="screen" direction={-1}/><Worker x={516} y={473} delay={1.6}/>
          </g>

          <g className="room roomCommerce" onClick={() => setSelected(departments[3])} tabIndex={0} role="button">
            <rect x="700" y="364" width="475" height="146" rx="6" className="roomBase"/><rect x="714" y="377" width="447" height="120" rx="4" className="roomGlass"/>
            <g className="marketScreens"><rect x="736" y="395" width="89" height="48"/><rect x="834" y="395" width="89" height="48"/><rect x="932" y="395" width="89" height="48"/></g>
            <g className="productBench"><rect x="752" y="454" width="320" height="10"/><rect x="770" y="464" width="8" height="22"/><rect x="1042" y="464" width="8" height="22"/><rect x="797" y="434" width="18" height="18"/><rect x="849" y="428" width="18" height="24"/><rect x="901" y="437" width="18" height="15"/></g>
            <text x="724" y="390" className="roomTitle">COMMERCE HUB</text><text x="724" y="408" className="roomSub">7 products live · £721 today</text>
            <Worker x={742} y={476} task="carrying"/><Worker x={947} y={476} task="screen" delay={1}/><Worker x={1100} y={476} direction={-1}/>
          </g>

          <g className="room roomFinance" onClick={() => setSelected(departments[4])} tabIndex={0} role="button">
            <rect x="95" y="555" width="486" height="130" rx="6" className="roomBase"/><rect x="109" y="568" width="458" height="104" rx="4" className="roomGlass"/>
            <g className="financeChart"><rect x="132" y="589" width="152" height="58"/><path d="M145 633 L173 615 L199 621 L229 594 L269 603"/><circle cx="269" cy="603" r="4"/></g>
            <g className="financeTable"><rect x="325" y="633" width="190" height="9"/><rect x="340" y="642" width="7" height="20"/><rect x="493" y="642" width="7" height="20"/><rect x="351" y="609" width="58" height="21"/><rect x="431" y="609" width="58" height="21"/></g>
            <text x="119" y="583" className="roomTitle">FINANCE CENTRE</text><text x="119" y="601" className="roomSub">Treasury reconciled · forecast healthy</text>
            <Worker x={301} y={654} task="screen"/><Worker x={438} y={654} delay={1.4}/>
          </g>

          <g className="room roomOperations" onClick={() => setSelected(departments[5])} tabIndex={0} role="button">
            <rect x="700" y="555" width="475" height="130" rx="6" className="roomBase"/><rect x="714" y="568" width="447" height="104" rx="4" className="roomGlass"/>
            <g className="workflowMap"><rect x="738" y="590" width="206" height="55"/>{[0,1,2,3].map(i=><g key={i}><circle cx={765+i*48} cy={618} r="8"/><line x1={773+i*48} y1="618" x2={797+i*48} y2="618"/></g>)}</g>
            <g className="serverRack"><rect x="983" y="587" width="142" height="61"/>{[0,1,2,3].map(i=><rect key={i} x="997" y={595+i*12} width="113" height="7"/>)}</g>
            <text x="724" y="583" className="roomTitle">OPERATIONS CENTRE</text><text x="724" y="601" className="roomSub">23 workflows running · 0 blocked</text>
            <Worker x={961} y={654} task="carrying"/><Worker x={1130} y={654} direction={-1}/>
          </g>

          <g className="aiCore" onClick={() => setSelected(departments[1])} tabIndex={0} role="button">
            <rect x="603" y="536" width="76" height="149" rx="5"/><text x="641" y="558" textAnchor="middle">AI OPS</text><circle cx="641" cy="602" r="22"/><path d="M620 602 H662 M641 581 V623"/><rect x="618" y="640" width="46" height="23" rx="3"/>
          </g>

          <path id="walkMiddle" d="M160 491 C310 481 462 486 565 480 C650 476 690 476 744 480 C870 489 1010 489 1125 478" fill="none"/>
          <path id="walkTop" d="M230 297 C390 284 488 287 610 287 C742 287 900 293 1070 280" fill="none"/>
          <path id="walkBottom" d="M170 663 C330 654 475 659 560 655 C740 650 920 658 1110 652" fill="none"/>
          <MovingWorker path="M160 491 C310 481 462 486 565 480 C650 476 690 476 744 480 C870 489 1010 489 1125 478" delay={0}/>
          <MovingWorker path="M1070 280 C900 293 742 287 610 287 C488 287 390 284 230 297" delay={-6} task="walking"/>
          <MovingWorker path="M170 663 C330 654 475 659 560 655 C740 650 920 658 1110 652" delay={-10}/>
          <DataPulse path="M274 429 C440 410 530 430 621 410 C710 392 830 414 1030 421" delay={0}/>
          <DataPulse path="M1030 614 C900 602 790 615 664 594 C550 574 430 605 275 611" delay={-4} tone="amber"/>
          <DataPulse path="M641 655 L641 180" delay={-2} tone="cyan"/>
        </svg>
      </section>

      <aside className={`worldActivity ${activityOpen ? "open" : ""}`}>
        <div className="activityHeader"><div><span>LIVE ACTIVITY</span><small>Company events</small></div><button onClick={() => setActivityOpen(v => !v)}>{activityOpen ? "–" : "+"}</button></div>
        {activityOpen && <div className="activityItems">{activities.map((a, i) => <article key={a}><i /><div><p>{a}</p><time>{i * 3 + 2} min ago</time></div></article>)}</div>}
        <button className="briefButton" onClick={() => setSelected(departments[0])}>OPEN CEO BRIEFING</button>
      </aside>

      <footer className="worldFooter"><span><i /> SYSTEMS NOMINAL</span><b>GENESIS STARTUP HQ · 12 ACTIVE AI WORKERS</b><small>Local environment: {phase}</small></footer>

      {selected && <div className="departmentOverlay" onClick={() => setSelected(null)}>
        <section onClick={(e) => e.stopPropagation()}>
          <button className="closePanel" onClick={() => setSelected(null)}>×</button>
          <span className="panelEyebrow">DEPARTMENT WORKSPACE</span>
          <h2>{selected.name}</h2><p>{selected.detail}</p>
          <div className="panelStats"><article><span>Status</span><strong>{selected.status}</strong></article><article><span>Live metric</span><strong>{selected.metric}</strong></article><article><span>Workers</span><strong>{selected.id === "ceo" ? "3" : "2"}</strong></article></div>
          <div className="panelTimeline"><h3>Current activity</h3><div><i />Task queue operating normally</div><div><i />Department agent responding</div><div><i />Latest data synchronised</div></div>
          <button className="enterWorkspace">ENTER WORKSPACE</button>
        </section>
      </div>}
    </main>
  );
}
