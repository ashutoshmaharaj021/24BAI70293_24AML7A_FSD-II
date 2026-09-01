import { useEffect, useMemo, useState } from "react";

import DraftForm from "./components/DraftForm";
import DraftList from "./components/DraftList";
import StatusMessage from "./components/StatusMessage";

import {
  createDraft,
  deleteDraft,
  getDrafts,
  updateDraft,
} from "./services/draftService";

const initialForm = {
  title: "",
  content: "",
  platform: "Instagram",
};

function App() {
  const [drafts, setDrafts] = useState([]);

  const [formData, setFormData] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [status, setStatus] =
    useState(null);

  const [viewingDraft, setViewingDraft] =
    useState(null);

  /*
    READ drafts when application loads.
  */
  useEffect(() => {
    const loadDrafts = async () => {
      try {
        setInitialLoading(true);

        const data = await getDrafts();

        setDrafts(data);
      } catch (error) {
        setStatus({
          type: "error",
          message: "Unable to load drafts.",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadDrafts();
  }, []);

  /*
    CREATE / UPDATE
  */
  const handleSave = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim()
    ) {
      setStatus({
        type: "error",
        message:
          "Please enter both a title and content.",
      });

      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        const updatedDraft =
          await updateDraft(
            editingId,
            formData
          );

        setDrafts((currentDrafts) =>
          currentDrafts.map((draft) =>
            draft.id === editingId
              ? updatedDraft
              : draft
          )
        );

        setStatus({
          type: "success",
          message: "Draft updated successfully.",
        });
      } else {
        const newDraft =
          await createDraft(formData);

        setDrafts((currentDrafts) => [
          newDraft,
          ...currentDrafts,
        ]);

        setStatus({
          type: "success",
          message: "Draft saved successfully.",
        });
      }

      setFormData(initialForm);
      setEditingId(null);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
    EDIT
  */
  const handleEdit = (draft) => {
    setEditingId(draft.id);

    setFormData({
      title: draft.title,
      content: draft.content,
      platform: draft.platform,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
    DELETE
  */
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteDraft(id);

      setDrafts((currentDrafts) =>
        currentDrafts.filter(
          (draft) => draft.id !== id
        )
      );

      if (viewingDraft?.id === id) {
        setViewingDraft(null);
      }

      setStatus({
        type: "success",
        message: "Draft deleted successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Unable to delete draft.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
    CANCEL EDITING
  */
  const handleCancel = () => {
    setEditingId(null);
    setFormData(initialForm);
  };

  /*
    STATISTICS
  */
  const statistics = useMemo(() => {
    const totalCharacters = drafts.reduce(
      (total, draft) =>
        total + draft.content.length,
      0
    );

    const platformsUsed = new Set(
      drafts.map((draft) => draft.platform)
    ).size;

    return {
      totalDrafts: drafts.length,
      totalCharacters,
      platformsUsed,
    };
  }, [drafts]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <span className="eyebrow">
              SOCIAL MEDIA MANAGEMENT
            </span>

            <h1>Draft Manager</h1>

            <p>
              Save your ideas now. Publish them when
              they're ready.
            </p>
          </div>

          <div className="header-badge">
            💾 Auto-persisted
          </div>
        </div>
      </header>

      <main className="container">
        <StatusMessage
          status={status}
          onClose={() => setStatus(null)}
        />

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Drafts</span>
            <strong>
              {statistics.totalDrafts}
            </strong>
          </div>

          <div className="stat-card">
            <span>Total Characters</span>
            <strong>
              {statistics.totalCharacters.toLocaleString()}
            </strong>
          </div>

          <div className="stat-card">
            <span>Platforms Used</span>
            <strong>
              {statistics.platformsUsed}
            </strong>
          </div>
        </section>

        <div className="main-grid">
          <DraftForm
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
            onSave={handleSave}
            onCancel={handleCancel}
            loading={loading}
          />

          {initialLoading ? (
            <section className="card loading-card">
              <div className="spinner"></div>
              <p>Loading drafts...</p>
            </section>
          ) : (
            <DraftList
              drafts={drafts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={setViewingDraft}
            />
          )}
        </div>
      </main>

      {viewingDraft && (
        <div
          className="modal-overlay"
          onClick={() => setViewingDraft(null)}
        >
          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <span className="platform-tag">
                  {viewingDraft.platform}
                </span>

                <h2>{viewingDraft.title}</h2>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setViewingDraft(null)
                }
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <p>{viewingDraft.content}</p>
            </div>

            <div className="modal-footer">
              Last updated:{" "}
              {new Date(
                viewingDraft.updatedAt
              ).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>
          Experiment 02 • Frontend Draft Management
          System
        </p>
      </footer>
    </div>
  );
}

export default App;