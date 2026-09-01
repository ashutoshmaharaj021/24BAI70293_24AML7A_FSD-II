import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

/*
 * ----------------------------------------------------
 * NORMALIZED POST STORAGE
 * ----------------------------------------------------
 */

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,

  sortComparer: (a, b) =>
    new Date(b.createdAt) -
    new Date(a.createdAt),
});

/*
 * ----------------------------------------------------
 * INITIAL MOCK DATA
 * ----------------------------------------------------
 */

const initialPosts = [
  {
    id: "post-1",
    title: "Optimizing React Performance",
    content:
      "Tips and techniques for building faster React applications.",
    platformId: "linkedin",
    status: "published",
    likes: 120,
    shares: 45,
    comments: 23,
    createdAt: "2026-08-30T10:30:00.000Z",
  },

  {
    id: "post-2",
    title: "New Features in Our Product",
    content:
      "We are excited to announce our latest product features.",
    platformId: "twitter",
    status: "draft",
    likes: 65,
    shares: 20,
    comments: 12,
    createdAt: "2026-08-29T08:20:00.000Z",
  },

  {
    id: "post-3",
    title: "Behind the Scenes",
    content:
      "A look into our development process and team workflow.",
    platformId: "instagram",
    status: "published",
    likes: 210,
    shares: 80,
    comments: 35,
    createdAt: "2026-08-28T14:00:00.000Z",
  },

  {
    id: "post-4",
    title: "Industry Trends 2026",
    content:
      "Exploring the latest technology and software trends.",
    platformId: "linkedin",
    status: "draft",
    likes: 92,
    shares: 31,
    comments: 18,
    createdAt: "2026-08-27T09:10:00.000Z",
  },

  {
    id: "post-5",
    title: "Weekend Vibes",
    content:
      "Taking some time away from the keyboard this weekend.",
    platformId: "facebook",
    status: "published",
    likes: 175,
    shares: 52,
    comments: 28,
    createdAt: "2026-08-25T16:45:00.000Z",
  },

  {
    id: "post-6",
    title: "Learning Redux Toolkit",
    content:
      "Understanding slices, selectors, middleware and normalized state.",
    platformId: "twitter",
    status: "scheduled",
    likes: 75,
    shares: 25,
    comments: 14,
    createdAt: "2026-08-24T11:30:00.000Z",
  },
];

/*
 * ----------------------------------------------------
 * PLATFORM DATA
 * ----------------------------------------------------
 */

export const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
  },

  {
    id: "twitter",
    name: "Twitter / X",
    icon: "𝕏",
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
  },

  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
  },
];

/*
 * ----------------------------------------------------
 * INITIAL STATE
 * ----------------------------------------------------
 */

const initialState =
  postsAdapter.setAll(
    postsAdapter.getInitialState({
      filter: "all",
      platformFilter: "all",
      searchQuery: "",
      renderTestCounter: 0,
    }),
    initialPosts
  );

/*
 * ----------------------------------------------------
 * SLICE
 * ----------------------------------------------------
 */

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    setStatusFilter(state, action) {
      state.filter = action.payload;
    },

    setPlatformFilter(state, action) {
      state.platformFilter =
        action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery =
        action.payload;
    },

    addTestUpdate(state) {
      state.renderTestCounter += 1;
    },

    addPost(state, action) {
      postsAdapter.addOne(
        state,
        action.payload
      );
    },

    updatePost(state, action) {
      postsAdapter.updateOne(
        state,
        action.payload
      );
    },

    deletePost(state, action) {
      postsAdapter.removeOne(
        state,
        action.payload
      );
    },
  },
});

export const {
  setStatusFilter,
  setPlatformFilter,
  setSearchQuery,
  addTestUpdate,
  addPost,
  updatePost,
  deletePost,
} = postsSlice.actions;

/*
 * ----------------------------------------------------
 * BASIC SELECTORS
 * ----------------------------------------------------
 */

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => state.posts
);

/*
 * ----------------------------------------------------
 * MEMOIZED SELECTORS
 * ----------------------------------------------------
 *
 * createSelector() is provided by Redux Toolkit.
 *
 * The result function runs again only when
 * its input selector values change.
 *
 * ----------------------------------------------------
 */

/*
 * Filter posts by status.
 */

export const selectFilteredPosts =
  createSelector(
    [
      selectAllPosts,
      (state) => state.posts.filter,
    ],

    (posts, filter) => {
      console.log(
        "🔄 Recomputing filtered posts..."
      );

      if (filter === "all") {
        return posts;
      }

      return posts.filter(
        (post) =>
          post.status === filter
      );
    }
  );

/*
 * Filter posts by platform.
 */

export const selectPlatformFilteredPosts =
  createSelector(
    [
      selectFilteredPosts,
      (state) =>
        state.posts.platformFilter,
    ],

    (posts, platformFilter) => {
      console.log(
        "🔄 Recomputing platform filter..."
      );

      if (platformFilter === "all") {
        return posts;
      }

      return posts.filter(
        (post) =>
          post.platformId ===
          platformFilter
      );
    }
  );

/*
 * Search posts.
 */

export const selectSearchResults =
  createSelector(
    [
      selectPlatformFilteredPosts,
      (state) =>
        state.posts.searchQuery,
    ],

    (posts, searchQuery) => {
      console.log(
        "🔄 Recomputing search results..."
      );

      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return posts;
      }

      return posts.filter(
        (post) =>
          post.title
            .toLowerCase()
            .includes(query) ||
          post.content
            .toLowerCase()
            .includes(query)
      );
    }
  );

/*
 * ----------------------------------------------------
 * DERIVED STATISTICS
 * ----------------------------------------------------
 */

export const selectPostStatistics =
  createSelector(
    [selectAllPosts],

    (posts) => {
      console.log(
        "🔄 Recomputing statistics..."
      );

      const totalLikes = posts.reduce(
        (sum, post) =>
          sum + post.likes,
        0
      );

      const totalShares = posts.reduce(
        (sum, post) =>
          sum + post.shares,
        0
      );

      const totalComments =
        posts.reduce(
          (sum, post) =>
            sum + post.comments,
          0
        );

      const drafts = posts.filter(
        (post) =>
          post.status === "draft"
      ).length;

      const published =
        posts.filter(
          (post) =>
            post.status === "published"
        ).length;

      const scheduled =
        posts.filter(
          (post) =>
            post.status === "scheduled"
        ).length;

      return {
        total: posts.length,
        drafts,
        published,
        scheduled,
        totalLikes,
        totalShares,
        totalComments,
        engagement:
          totalLikes +
          totalShares +
          totalComments,
      };
    }
  );

/*
 * ----------------------------------------------------
 * PLATFORM GROUPING
 * ----------------------------------------------------
 */

export const selectPostsByPlatform =
  createSelector(
    [selectAllPosts],

    (posts) => {
      console.log(
        "🔄 Recomputing platform grouping..."
      );

      return platforms.map(
        (platform) => ({
          ...platform,

          posts: posts.filter(
            (post) =>
              post.platformId ===
              platform.id
          ),

          count: posts.filter(
            (post) =>
              post.platformId ===
              platform.id
          ).length,
        })
      );
    }
  );

export default postsSlice.reducer;