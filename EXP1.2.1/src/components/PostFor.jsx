import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost } from "../features/posts/postsSlice";
import {
  selectAllPlatforms,
} from "../features/platforms/platformsSlice";

const initialForm = {
  title: "",
  content: "",
  platformId: "instagram",
  status: "draft",
};

function PostForm() {
  const dispatch = useDispatch();

  const platforms =
    useSelector(selectAllPlatforms);

  const [formData, setFormData] =
    useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.content.trim()
    ) {
      return;
    }

    dispatch(
      addPost({
        ...formData,
        title: formData.title.trim(),
        content: formData.content.trim(),
      })
    );

    setFormData(initialForm);
  };

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Create Post</h2>

          <p>
            Add a new post to the centralized Redux
            store.
          </p>
        </div>

        <span className="redux-badge">
          Redux
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            Post Title
          </label>

          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="platformId">
            Platform
          </label>

          <select
            id="platformId"
            name="platformId"
            value={formData.platformId}
            onChange={handleChange}
          >
            {platforms.map((platform) => (
              <option
                key={platform.id}
                value={platform.id}
              >
                {platform.icon}{" "}
                {platform.name}
              </option>
            ))}
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
            placeholder="Write your post..."
            rows="7"
            required
          />

          <div className="character-count">
            {formData.content.length} characters
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">
              Draft
            </option>

            <option value="scheduled">
              Scheduled
            </option>

            <option value="published">
              Published
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="primary-button full-width"
        >
          + Add Post
        </button>
      </form>
    </section>
  );
}

export default PostForm;