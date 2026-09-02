import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">

      <div className="navbar-brand">
        🛡️ RBAC Lab
      </div>

      <nav>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/posts">
          Posts
        </Link>

        {user?.role === "Admin" && (
          <Link to="/admin">
            Admin Panel
          </Link>
        )}

        {["Admin", "Editor"].includes(
          user?.role
        ) && (
          <Link to="/editor">
            Editor
          </Link>
        )}

      </nav>

      <div className="user-area">

        <span>
          {user?.name}
        </span>

        <span className="role-badge">
          {user?.role}
        </span>

        <button
          onClick={logout}
          className="logout-button"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;