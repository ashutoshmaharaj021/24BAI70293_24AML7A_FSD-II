import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter email and password."
      );
      return;
    }

    const result = login(
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="security-icon">
          🛡️
        </div>

        <span className="eyebrow">
          EXPERIMENT 03
        </span>

        <h1>
          Role-Based Access
        </h1>

        <p>
          Sign in to access
          role-specific resources.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            className="primary-button"
            type="submit"
          >
            Sign In
          </button>

        </form>

        <div className="demo-users">

          <strong>
            Demo Accounts
          </strong>

          <span>
            Admin: admin@example.com /
            admin123
          </span>

          <span>
            Editor: editor@example.com /
            editor123
          </span>

          <span>
            Viewer: viewer@example.com /
            viewer123
          </span>

        </div>

      </div>
    </div>
  );
}

export default Login;