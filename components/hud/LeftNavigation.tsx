const items = ["Command HQ", "Buildings", "Businesses", "Settings"];

export function LeftNavigation() {
  return (
    <nav className="leftNav" aria-label="Primary navigation">
      {items.map((item, index) => (
        <button className={index === 0 ? "navItem active" : "navItem"} key={item} type="button">
          <span className="navGlyph" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </button>
      ))}
      <div className="growthCard">
        <span>HQ LEVEL</span>
        <strong>01</strong>
        <small>Expansion available</small>
      </div>
    </nav>
  );
}
