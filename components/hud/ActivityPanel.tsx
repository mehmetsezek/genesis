import { activities } from "@/data/genesis";

export function ActivityPanel() {
  return (
    <aside className="activityPanel">
      <div className="panelTabs">
        <button className="active" type="button">Activity</button>
        <button type="button">Messages</button>
        <button type="button">Alerts <span>1</span></button>
      </div>
      <div className="activityList">
        {activities.map((item, index) => (
          <article key={item}>
            <span className="activityPulse" aria-hidden="true" />
            <div>
              <p>{item}</p>
              <time>{index + 2} min ago</time>
            </div>
          </article>
        ))}
      </div>
      <button className="briefingButton" type="button">Open CEO briefing</button>
    </aside>
  );
}
