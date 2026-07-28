"use client";

import { AnimatePresence, motion } from "motion/react";

type ApprovalState = "pending" | "publishing" | "approved";

type Props = {
  open: boolean;
  approvalState: ApprovalState;
  revenue: number;
  profit: number;
  onApprove: () => void;
  onClose: () => void;
};

export function CEOBriefing({ open, approvalState, revenue, profit, onApprove, onClose }: Props) {
  const margin = Math.round((profit / revenue) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="briefingOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className="ceoBriefing" initial={{ y: 28, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 18, scale: 0.98 }}>
            <header>
              <div><span>CEO MORNING BRIEFING</span><h2>Genesis is operating normally.</h2></div>
              <button onClick={onClose} type="button">Close</button>
            </header>
            <div className="briefingSummary">
              <article><span>TODAY</span><strong>£{revenue} revenue</strong><small>£{profit} profit · {margin}% margin</small></article>
              <article><span>WORKFORCE</span><strong>12 active agents</strong><small>2 currently coordinating</small></article>
              <article><span>SYSTEM</span><strong>98% healthy</strong><small>9 automations operational</small></article>
            </div>
            <div className="briefingBody">
              <div>
                <span>PRIORITY DECISION</span>
                {approvalState === "pending" && (
                  <>
                    <h3>Approve Commerce Listing 014</h3>
                    <p>Creative assets are complete. Commerce is waiting for approval before publishing the new Etsy listing.</p>
                    <div className="briefingActions">
                      <button type="button">Review listing</button>
                      <button className="primaryAction" onClick={onApprove} type="button">Approve</button>
                    </div>
                  </>
                )}
                {approvalState === "publishing" && (
                  <div className="decisionComplete processingDecision">
                    <strong>Publishing Listing 014…</strong>
                    <p>Commerce is processing the approved listing and preparing it for the marketplace.</p>
                    <span className="decisionProgress" aria-hidden="true"><i /></span>
                  </div>
                )}
                {approvalState === "approved" && (
                  <div className="decisionComplete">
                    <strong>Approved ✓</strong>
                    <p>Commerce Listing 014 is live. There are no pending CEO approvals.</p>
                    <small>Decision saved on this device</small>
                  </div>
                )}
              </div>
              <div>
                <span>WHAT CHANGED</span>
                <ul>
                  {approvalState === "approved" && <li>Commerce Listing 014 was approved and published.</li>}
                  <li>Creative completed three product mock-ups.</li>
                  <li>Finance recorded £74 in new revenue.</li>
                  <li>Operations restored Workflow 04.</li>
                </ul>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
