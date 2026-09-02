import { useEffect, useState } from "react";

function Dashboard({
  user,
  onLogout,
}) {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "jwt_token"
            );

          if (!token) {
            throw new Error(
              "Authentication token not found."
            );
          }

          const response =
            await fetch(
              "http://localhost:5000/api/auth/profile",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.message ||
                "Authentication failed."
            );
          }

          setProfile(data.user);
        } catch (error) {
          setError(error.message);

          /*
           * Token may have expired.
           */

          localStorage.removeItem(
            "jwt_token"
          );

          localStorage.removeItem(
            "auth_user"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "jwt_token"
    );

    localStorage.removeItem(
      "auth_user"
    );

    onLogout();
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          🔐
        </div>

        <p>
          Validating JWT...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <div className="protected-error">
          <h2>
            Authentication Failed
          </h2>

          <p>{error}</p>

          <button
            onClick={handleLogout}
            className="login-button"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">

        <div className="brand">
          <div className="brand-icon">
            🔐
          </div>

          <div>
            <strong>
              Secure Dashboard
            </strong>

            <span>
              JWT Authentication
            </span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      <main className="dashboard-content">

        <div className="success-banner">
          <span>✓</span>

          <div>
            <strong>
              Authentication Successful
            </strong>

            <p>
              Your JWT was successfully
              validated by the server.
            </p>
          </div>
        </div>

        <section className="welcome-card">

          <span className="eyebrow">
            PROTECTED RESOURCE
          </span>

          <h1>
            Welcome,{" "}
            {profile?.name ||
              user?.name}
            !
          </h1>

          <p>
            You are viewing a protected
            resource that requires a
            valid JWT.
          </p>

        </section>

        <div className="info-grid">

          <div className="info-card">
            <span>
              USER ID
            </span>

            <strong>
              {profile?.id}
            </strong>
          </div>

          <div className="info-card">
            <span>
              EMAIL
            </span>

            <strong>
              {profile?.email}
            </strong>
          </div>

          <div className="info-card">
            <span>
              ROLE
            </span>

            <strong>
              {profile?.role}
            </strong>
          </div>

          <div className="info-card">
            <span>
              SESSION
            </span>

            <strong>
              JWT Active
            </strong>
          </div>

        </div>

        <section className="flow-card">

          <h2>
            Authentication Flow
          </h2>

          <div className="flow">

            <div>
              <b>1</b>
              <span>
                Login
              </span>
            </div>

            <i>→</i>

            <div>
              <b>2</b>
              <span>
                JWT Generated
              </span>
            </div>

            <i>→</i>

            <div>
              <b>3</b>
              <span>
                Token Stored
              </span>
            </div>

            <i>→</i>

            <div>
              <b>4</b>
              <span>
                Token Verified
              </span>
            </div>

            <i>→</i>

            <div>
              <b>5</b>
              <span>
                Access Granted
              </span>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;