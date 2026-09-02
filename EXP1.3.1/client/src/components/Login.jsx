import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter email and password."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Login failed."
        );
      }

      /*
       * Store token for this
       * classroom demonstration.
       */

      localStorage.setItem(
        "jwt_token",
        data.token
      );

      localStorage.setItem(
        "auth_user",
        JSON.stringify(data.user)
      );

      onLogin(data.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="login-card">

        <div className="login-logo">
          🔐
        </div>

        <span className="eyebrow">
          EXPERIMENT 1.3.1
        </span>

        <h1>
          JWT Authentication
        </h1>

        <p className="login-description">
          Secure token-based login and
          session management.
        </p>

        <form
          onSubmit={handleSubmit}
        >
          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
          />

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Authenticating..."
              : "Login"}
          </button>
        </form>

        <div className="demo-credentials">
          <strong>
            Demo Credentials
          </strong>

          <span>
            student@example.com
          </span>

          <span>
            Password: demo123
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;