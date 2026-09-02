import Navbar from "../components/Navbar";

function Editor() {
  return (
    <div className="app-page">

      <Navbar />

      <main className="page-content">

        <div className="editor-card">

          <span className="eyebrow">
            EDITOR ACCESS
          </span>

          <h1>
            Content Editor
          </h1>

          <p>
            Admin and Editor users can
            access content editing tools.
          </p>

          <textarea
            placeholder="Write your content..."
          />

          <button className="primary-button">
            Save Changes
          </button>

        </div>

      </main>

    </div>
  );
}

export default Editor;