function DraftForm({
  formData,
  setFormData,
  editingId,
  onSave,
  onCancel,
  loading,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave();
  };

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>
            {editingId ? "Edit Draft" : "Create Draft"}
          </h2>

          <p>
            Save your content and continue working on it
            later.
          </p>
        </div>

        {editingId && (
          <button
            type="button"
            className="text-button"
            onClick={onCancel}
          >
            Cancel editing
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            Draft Title
          </label>

          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Product Launch Post"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform">
            Platform
          </label>

          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          >
            <option value="Instagram">
              Instagram
            </option>

            <option value="X / Twitter">
              X / Twitter
            </option>

            <option value="LinkedIn">
              LinkedIn
            </option>

            <option value="Facebook">
              Facebook
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Content
          </label>

          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content..."
            rows="9"
            required
          />

          <div className="character-count">
            {formData.content.length} characters
          </div>
        </div>

        <button
          type="submit"
          className="primary-button full-width"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingId
              ? "Update Draft"
              : "Save Draft"}
        </button>
      </form>
    </section>
  );
}

export default DraftForm;