function DraftCard({
  draft,
  onEdit,
  onDelete,
  onView,
}) {
  const formattedDate = new Date(
    draft.updatedAt
  ).toLocaleString();

  return (
    <article className="draft-card">
      <div className="draft-card-header">
        <div>
          <h3>{draft.title}</h3>

          <span className="platform-tag">
            {draft.platform}
          </span>
        </div>

        <span className="draft-date">
          {formattedDate}
        </span>
      </div>

      <p className="draft-content">
        {draft.content.length > 180
          ? `${draft.content.substring(0, 180)}...`
          : draft.content}
      </p>

      <div className="draft-meta">
        <span>
          {draft.content.length} characters
        </span>
      </div>

      <div className="draft-actions">
        <button
          type="button"
          className="view-button"
          onClick={() => onView(draft)}
        >
          View
        </button>

        <button
          type="button"
          className="edit-button"
          onClick={() => onEdit(draft)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(draft.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default DraftCard;