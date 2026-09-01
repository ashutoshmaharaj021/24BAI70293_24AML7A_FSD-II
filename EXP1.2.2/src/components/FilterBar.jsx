import { useDispatch, useSelector } from "react-redux";

import {
  setPlatformFilter,
  setSearchQuery,
  setStatusFilter,
} from "../features/posts/postsSlice";

import { platforms } from "../features/posts/postsSlice";

function FilterBar() {
  const dispatch = useDispatch();

  const status = useSelector(
    (state) => state.posts.filter
  );

  const platform = useSelector(
    (state) =>
      state.posts.platformFilter
  );

  const search = useSelector(
    (state) =>
      state.posts.searchQuery
  );

  return (
    <div className="filter-bar">
      <select
        value={platform}
        onChange={(event) =>
          dispatch(
            setPlatformFilter(
              event.target.value
            )
          )
        }
      >
        <option value="all">
          All Platforms
        </option>

        {platforms.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(event) =>
          dispatch(
            setStatusFilter(
              event.target.value
            )
          )
        }
      >
        <option value="all">
          All Statuses
        </option>

        <option value="published">
          Published
        </option>

        <option value="draft">
          Draft
        </option>

        <option value="scheduled">
          Scheduled
        </option>
      </select>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(event) =>
          dispatch(
            setSearchQuery(
              event.target.value
            )
          )
        }
      />
    </div>
  );
}

export default FilterBar;