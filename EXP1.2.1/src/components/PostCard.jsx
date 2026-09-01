import { useDispatch, useSelector } from "react-redux";

import {
  deletePost,
  selectPost,
  selectPostById,
} from "../features/posts/postsSlice";

import {
  selectPlatformById,
} from "../features/platforms/platformsSlice";

function PostCard({ postId }) {
  const dispatch = useDispatch();

  /*
    Select only the required entity from Redux.
  */
  const post = useSelector((state) =>
    selectPostById(state, postId)
  );

  const platform = useSelector((state) =>
    selectPlatformById(
      state,
      post?.platformId
    )
  );

  if (!post) {
    return null;
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Delete this post?"
    );

    if (confirmed) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <article className="post-card">
      <div className="post-header">
        <div>
          <span className="platform-tag">
            {platform?.icon}{" "}
            {platform?.name ||
              "Unknown Platform"}
          </span>

          <h3>{post.title}</h3>
        </div>

        <span
          className={`status-tag ${post.status}`}
        >
          {post.status}
        </span>
      </div>

      <p className="post-content">
        {post.content}
      </p>

      <div className="post-meta">
        <span>
          {post.content.length} characters
        </span>

        <span>
          {new Date(
            post.createdAt
          ).toLocaleDateString()}
        </span>
      </div>

      <div className="post-actions">
        <button
          type="button"
          className="view-button"
          onClick={() =>
            dispatch(selectPost(post.id))
          }
        >
          Select
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default PostCard;