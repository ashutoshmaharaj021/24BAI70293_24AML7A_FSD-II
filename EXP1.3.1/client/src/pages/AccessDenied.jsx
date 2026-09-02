import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div className="access-denied">

      <div className="denied-card">

        <div className="denied-icon">
          🚫
        </div>

        <span className="eyebrow">
          403
        </span>

        <h1>
          Access Denied
        </h1>

        <p>
          You don't have permission
          to access this resource.
        </p>

        <Link
          to="/dashboard"
          className="primary-button link-button"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default AccessDenied;