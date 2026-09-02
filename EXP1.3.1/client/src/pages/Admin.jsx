import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Admin() {
  const { user } = useAuth();

  return (
    <div className="app-page">

      <Navbar />

      <main className="page-content">

        <div className="admin-card">

          <div className="admin-icon">
            👑
          </div>

          <span className="eyebrow">
            ADMINISTRATOR ONLY
          </span>

          <h1>
            Admin Control Panel
          </h1>

          <p>
            Welcome {user.name}. This
            page is accessible only to
            users with the Admin role.
          </p>

          <div className="admin-actions">

            <button className="primary-button">
              Manage Users
            </button>

            <button className="secondary-button">
              System Settings
            </button>

            <button className="secondary-button">
              Security Logs
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Admin;