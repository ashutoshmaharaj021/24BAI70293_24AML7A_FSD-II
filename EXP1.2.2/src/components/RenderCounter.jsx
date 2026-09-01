import {
  useMemo,
  useRef,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addTestUpdate,
} from "../features/posts/postsSlice";

function RenderCounter() {
  const dispatch = useDispatch();

  const renderCount =
    useRef(0);

  renderCount.current += 1;

  const updateCount =
    useSelector(
      (state) =>
        state.posts.renderTestCounter
    );

  /*
   * useMemo demonstration.
   *
   * This calculation is intentionally
   * separated from rendering.
   */
  const performanceMessage =
    useMemo(() => {
      return updateCount === 0
        ? "No test updates yet."
        : `Test updates triggered: ${updateCount}`;
    }, [updateCount]);

  return (
    <section className="performance-card">
      <div>
        <span className="small-label">
          PERFORMANCE DEMO
        </span>

        <h2>
          Render Optimization
        </h2>

        <p>
          This component demonstrates
          useMemo and render tracking.
        </p>
      </div>

      <div className="performance-grid">
        <div>
          <span>
            Component renders
          </span>

          <strong>
            {renderCount.current}
          </strong>
        </div>

        <div>
          <span>
            Redux test updates
          </span>

          <strong>
            {updateCount}
          </strong>
        </div>
      </div>

      <p className="performance-message">
        {performanceMessage}
      </p>

      <button
        className="secondary-button"
        onClick={() =>
          dispatch(addTestUpdate())
        }
      >
        Trigger State Update
      </button>
    </section>
  );
}

export default RenderCounter;