export default function TerminalLayout({
  title,
  subtitle,
  left,
  main,
  right,
  bottom,
}) {
  return (
    <div className="term-root">
      <header className="term-header">
        <div className="term-titleRow">
          <div className="term-title">{title}</div>
          {subtitle ? <div className="term-subtitle">{subtitle}</div> : null}
        </div>
        <div className="term-leds" aria-hidden="true">
          <span className="term-led term-led-red" />
          <span className="term-led term-led-yellow" />
          <span className="term-led term-led-green" />
        </div>
      </header>

      <div className="term-grid">
        <aside className="term-panel term-panel-left">{left}</aside>
        <main className="term-panel term-panel-main">{main}</main>
        <aside className="term-panel term-panel-right">{right}</aside>
      </div>

      <footer className="term-panel term-panel-bottom">{bottom}</footer>
    </div>
  );
}
