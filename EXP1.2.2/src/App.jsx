import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            ⚡
          </div>

          <div>
            <strong>
              Redux Optimized Dashboard
            </strong>

            <span>
              Performance Experiment
            </span>
          </div>
        </div>

        <div className="tech-stack">
          React
          <span>+</span>
          Redux Toolkit
          <span>+</span>
          Reselect
        </div>
      </header>

      <Dashboard />

      <footer>
        Experiment 4 • Memoized Selectors &
        Performance Optimization
      </footer>
    </div>
  );
}

export default App;