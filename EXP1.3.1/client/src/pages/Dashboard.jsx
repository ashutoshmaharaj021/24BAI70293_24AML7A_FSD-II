import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="app-page">

      <Navbar />

      <main className="page-content">

        <div className="welcome-card">

          <span className="eyebrow">
            AUTHENTICATED USER
          </span>

          <h1>
            Welcome, {user.name} 👋
          </h1>

          <p>
            You are authenticated and
            authorized to access this
            dashboard.
          </p>

          <div className="role-display">
            <span>
              Current Role
            </span>

            <strong>
              {user.role}
            </strong>
          </div>

        </div>

        <div className="permission-grid">

          <div className="permission-card">
            <span>IDENTITY</span>
            <strong>
              {user.email}
            </strong>
          </div>

          <div className="permission-card">
            <span>ROLE</span>
            <strong>
              {user.role}
            </strong>
          </div>

          <div className="permission-card">
            <span>AUTHENTICATION</span>
            <strong>
              ✓ Verified
            </strong>
          </div>

          <div className="permission-card">
            <span>AUTHORIZATION</span>
            <strong>
              ✓ Active
            </strong>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;