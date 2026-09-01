import React, { useRef } from "react";

import {
  platforms,
} from "../features/posts/postsSlice";

function PostItem({ post }) {
  const renderCount = useRef(0);

  renderCount.current += 1;

  const platform = platforms.find(
    (item) => item.id === post.platformId
  );

  return (
    <article className="post-item">

      <div className="post-item-top">

        <div>
          <span className="platform-label">
            {platform?.icon} {platform?.name}
          </span>

          <h3>{post.title}</h3>
        </div>

        <span
          className={`status ${post.status}`}
        >
          {post.status}
        </span>

      </div>

      <p>{post.content}</p>

      <div className="post-stats">

        <span>
          ❤️ {post.likes}
        </span>

        <span>
          🔁 {post.shares}
        </span>

        <span>
          💬 {post.comments}
        </span>

        <span className="render-count">
          Rendered: {renderCount.current}x
        </span>

      </div>

    </article>
  );
}

export default React.memo(PostItem);