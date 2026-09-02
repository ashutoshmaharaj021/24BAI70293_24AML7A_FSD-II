import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Posts() {
  const { user } = useAuth();

  const canCreate =
    ["Admin", "Editor"].includes(
      user.role
    );

  const canDelete =
    user.role === "Admin";

  return (
    <div className="app-page">

      <Navbar />

      <main className="page-content">

        <div className="page-heading">

          <div>
            <span className="eyebrow">
              CONTENT MANAGEMENT
            </span>

            <h1>
              Posts
            </h1>
          </div>

          {canCreate && (
            <button className="primary-button">
              + Create Post
            </button>
          )}

        </div>

        <div className="post-card">

          <div>
            <h2>
              Full Stack Development
            </h2>

            <p>
              Learning React and
              Role-Based Access Control.
            </p>
          </div>

          <div className="post-actions">

            {canCreate && (
              <button className="edit-button">
                Edit
              </button>
            )}

            {canDelete && (
              <button className="delete-button">
                Delete
              </button>
            )}

            {!canCreate && (
              <span className="read-only">
                Read Only
              </span>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Posts;