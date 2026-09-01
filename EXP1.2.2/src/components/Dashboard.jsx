import { useSelector } from "react-redux";

import {
  selectPostsByPlatform,
} from "../features/posts/postsSlice";

import Stats from "./Stats";
import FilterBar from "./FilterBar";
import PostList from "./PostList";
import RenderCounter from "./RenderCounter";

function Dashboard() {
  const platformGroups =
    useSelector(
      selectPostsByPlatform
    );

  return (
    <main className="dashboard">
      <div className="dashboard-title">
        <div>
          <span className="eyebrow">
            EXPERIMENT 04
          </span>

          <h1>
            Redux Performance Lab
          </h1>

          <p>
            Memoized selectors, derived state
            and efficient rendering.
          </p>
        </div>

        <div className="optimization-badge">
          ⚡ Optimized
        </div>
      </div>

      <Stats />

      <RenderCounter />

      <section className="card">
        <div className="section-header">
          <div>
            <h2>
              Posts by Platform
            </h2>

            <p>
              Grouped using a memoized
              derived-state selector.
            </p>
          </div>
        </div>

        <div className="platform-grid">
          {platformGroups.map(
            (platform) => (
              <div
                className="platform-card"
                key={platform.id}
              >
                <div className="platform-symbol">
                  {platform.icon}
                </div>

                <div>
                  <strong>
                    {platform.name}
                  </strong>

                  <span>
                    {platform.count} posts
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <div>
            <h2>
              Memoized Post Filtering
            </h2>

            <p>
              Derived data is recalculated
              only when its inputs change.
            </p>
          </div>
        </div>

        <FilterBar />

        <PostList />
      </section>
    </main>
  );
}

export default Dashboard;