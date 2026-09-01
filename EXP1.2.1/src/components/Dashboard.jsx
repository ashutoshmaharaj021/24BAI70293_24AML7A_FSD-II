import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
} from "../features/posts/postsSlice";

import {
  selectAllPosts,
} from "../features/posts/postsSlice";

import PostForm from "./PostForm";
import PostList from "./PostList";
import PlatformList from "./PlatformList";

function Dashboard() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);

  const loading = useSelector(
    (state) => state.posts.loading
  );

  const error = useSelector(
    (state) => state.posts.error
  );

  const selectedPostId = useSelector(
    (state) => state.posts.selectedPostId
  );

  const selectedPost = posts.find(
    (post) =>
      post.id === selectedPostId
  );

  return (
    <>
      <div className="dashboard-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            dispatch(fetchPosts())
          }
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "↻ Fetch Mock Posts"}
        </button>
      </div>

      {error && (
        <div className="error-message">
          ⚠ {error}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Posts</span>

          <strong>{posts.length}</strong>
        </div>

        <div className="stat-card">
          <span>Draft Posts</span>

          <strong>
            {
              posts.filter(
                (post) =>
                  post.status === "draft"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>Published</span>

          <strong>
            {
              posts.filter(
                (post) =>
                  post.status ===
                  "published"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>Selected Post</span>

          <strong>
            {selectedPost ? "1" : "0"}
          </strong>
        </div>
      </div>

      {selectedPost && (
        <div className="selected-post">
          <div>
            <span>SELECTED POST</span>

            <strong>
              {selectedPost.title}
            </strong>
          </div>

          <p>
            This value is being read directly
            from the centralized Redux store.
          </p>
        </div>
      )}

      <div className="main-grid">
        <div className="left-column">
          <PostForm />

          <PlatformList />
        </div>

        <div className="right-column">
          <PostList />
        </div>
      </div>
    </>
  );
}

export default Dashboard;