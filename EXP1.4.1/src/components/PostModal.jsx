import { memo } from "react";

function PostModal({ post, onClose }) {
  if (!post) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2>{post.title}</h2>

        <p>
          <strong>Platform:</strong>{" "}
          {post.platform}
        </p>

        <p>
          <strong>Scheduled:</strong>{" "}
          {new Date(post.date).toLocaleString()}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{post.description}</p>

        <button className="edit-btn">
          Edit Post
        </button>

      </div>
    </div>
  );
}

export default memo(PostModal);