import DraftCard from "./DraftCard";

function DraftList({
  drafts,
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Your Drafts</h2>

          <p>
            Manage your saved social media content.
          </p>
        </div>

        <span className="draft-count">
          {drafts.length}{" "}
          {drafts.length === 1 ? "draft" : "drafts"}
        </span>
      </div>

      {drafts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            📝
          </div>

          <h3>No drafts yet</h3>

          <p>
            Create your first draft using the form.
          </p>
        </div>
      ) : (
        <div className="draft-list">
          {drafts.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DraftList;