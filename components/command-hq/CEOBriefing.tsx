"use client";

import { AnimatePresence, motion } from "motion/react";

export function CEOBriefing({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="briefingOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className="ceoBriefing" initial={{ y: 28, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 18, scale: 0.98 }}>
            <header><div><span>CEO MORNING BRIEFING</span><h2>Genesis is operating normally.</h2></div><button onClick={onClose} type="button">Close</button></header>
            <div className="briefingSummary">
              <article><span>TODAY</span><strong>£684 revenue</strong><small>£419 profit · 61% margin</small></article>
              <article><span>WORKFORCE</span><strong>12 active agents</strong><small>2 currently coordinating</small></article>
              <article><span>SYSTEM</span><strong>98% healthy</strong><small>9 automations operational</small></article>
            </div>
            <div className="briefingBody">
              <div><span>PRIORITY DECISION</span><h3>Approve Commerce Listing 014</h3><p>Creative assets are complete. Commerce is waiting for approval before publishing the new Etsy listing.</p><div className="briefingActions"><button type="button">Review listing</button><button className="primaryAction" type="button">Approve</button></div></div>
              <div><span>WHAT CHANGED</span><ul><li>Creative completed three product mock-ups.</li><li>Finance recorded £74 in new revenue.</li><li>Operations restored Workflow 04.</li></ul></div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
