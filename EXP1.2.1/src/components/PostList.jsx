import { useSelector } from "react-redux";

import {
  selectAllPosts,
} from "../features/posts/postsSlice";

import PostCard from "./PostCard";

function PostList() {
  const posts = useSelector(selectAllPosts);

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Posts</h2>

          <p>
            Posts stored inside the Redux store.
          </p>
        </div>

        <span className="count-badge">
          {posts.length} posts
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <span>📝</span>

          <h3>No posts available</h3>

          <p>
            Create your first post using the form.
          </p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PostList;