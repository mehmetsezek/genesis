const items = ["Analytics", "Revenue", "Agent Network", "System Status"];

export function BottomNavigation() {
  return (
    <footer className="bottomNav">
      <div className="businessSelector">
        <span>ACTIVE BUSINESS</span>
        <strong>Genesis Commerce 01</strong>
      </div>
      <nav aria-label="Command shortcuts">
        {items.map((item) => <button type="button" key={item}>{item}</button>)}
      </nav>
      <div className="connection"><span /> Live systems connected</div>
    </footer>
  );
}
