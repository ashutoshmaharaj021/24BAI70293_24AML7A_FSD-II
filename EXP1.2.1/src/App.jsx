import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <span className="eyebrow">
              REDUX TOOLKIT EXPERIMENT
            </span>

            <h1>
              Post State Manager
            </h1>

            <p>
              Centralized, normalized and scalable
              application state.
            </p>
          </div>

          <div className="redux-status">
            <span className="redux-dot"></span>
            Redux Store Active
          </div>
        </div>
      </header>

      <main className="container">
        <Dashboard />
      </main>

      <footer>
        <p>
          Experiment 03 • Redux Toolkit State
          Management
        </p>
      </footer>
    </div>
  );
}

export default App;