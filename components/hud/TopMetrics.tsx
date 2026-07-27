import { metrics } from "@/data/genesis";

export function TopMetrics() {
  return (
    <header className="topMetrics" aria-label="Company metrics">
      <div className="brandLockup">
        <span className="brandMark">G</span>
        <div>
          <strong>GENESIS</strong>
          <small>COMMAND HQ</small>
        </div>
      </div>
      <div className="metricRail">
        {metrics.map((metric) => (
          <button className="metric" key={metric.label} type="button">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.trend}</small>
          </button>
        ))}
        <div className="metric clock">
          <span>Local Time</span>
          <strong>23:08</strong>
          <small>London / İstanbul</small>
        </div>
      </div>
    </header>
  );
}
