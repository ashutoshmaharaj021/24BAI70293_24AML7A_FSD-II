import { useSelector } from "react-redux";

import {
  selectSearchResults,
} from "../features/posts/postsSlice";

import PostItem from "./PostItem";

function PostList() {
  const posts = useSelector(
    selectSearchResults
  );

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <h2>Posts</h2>

          <p>
            Filtered using memoized selectors
          </p>
        </div>

        <span className="result-count">
          {posts.length} results
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="empty">
          🔍
          <h3>
            No posts found
          </h3>

          <p>
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PostList;