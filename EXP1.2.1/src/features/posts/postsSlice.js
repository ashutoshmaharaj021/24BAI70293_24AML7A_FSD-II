import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

/*
  Normalized post storage.

  Instead of storing posts as a normal array,
  Redux Toolkit maintains:

  {
    ids: [],
    entities: {}
  }
*/
const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,

  sortComparer: (a, b) =>
    new Date(b.createdAt) -
    new Date(a.createdAt),
});

/*
  Mock asynchronous API.

  This simulates a backend request.
*/
const mockFetchPosts = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "post-1",
          title: "AI Project Announcement",
          content:
            "Excited to share my latest AI project!",
          platformId: "linkedin",
          status: "draft",
          createdAt: "2026-09-01T09:00:00.000Z",
        },
        {
          id: "post-2",
          title: "Weekend Vibes",
          content:
            "Enjoying the weekend and working on new ideas.",
          platformId: "instagram",
          status: "published",
          createdAt: "2026-08-30T12:00:00.000Z",
        },
      ]);
    }, 1000);
  });

/*
  Async thunk.

  This demonstrates asynchronous Redux workflow.
*/
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const posts = await mockFetchPosts();

    return posts;
  }
);

const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null,
  selectedPostId: null,
});

/*
  Slice
*/
const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    addPost: {
      reducer(state, action) {
        postsAdapter.addOne(
          state,
          action.payload
        );
      },

      prepare(postData) {
        return {
          payload: {
            id: crypto.randomUUID(),
            ...postData,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    updatePost(state, action) {
      postsAdapter.updateOne(
        state,
        {
          id: action.payload.id,
          changes: {
            ...action.payload,
            updatedAt:
              new Date().toISOString(),
          },
        }
      );
    },

    deletePost(state, action) {
      postsAdapter.removeOne(
        state,
        action.payload
      );
    },

    selectPost(state, action) {
      state.selectedPostId =
        action.payload;
    },

    clearSelectedPost(state) {
      state.selectedPostId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPosts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchPosts.fulfilled,
        (state, action) => {
          state.loading = false;

          postsAdapter.setAll(
            state,
            action.payload
          );
        }
      )

      .addCase(
        fetchPosts.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ||
            "Failed to load posts.";
        }
      );
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  selectPost,
  clearSelectedPost,
} = postsSlice.actions;

/*
  Automatically generated selectors
  provided by createEntityAdapter.
*/
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => state.posts
);

export default postsSlice.reducer;