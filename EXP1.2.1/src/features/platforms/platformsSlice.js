import {
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

const platformsAdapter =
  createEntityAdapter({
    selectId: (platform) => platform.id,
  });

const initialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    color: "#E1306C",
    characterLimit: 2200,
  },

  {
    id: "twitter",
    name: "X / Twitter",
    icon: "𝕏",
    color: "#000000",
    characterLimit: 280,
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "#0A66C2",
    characterLimit: 3000,
  },

  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
    color: "#1877F2",
    characterLimit: 63206,
  },
];

const initialState =
  platformsAdapter.setAll(
    platformsAdapter.getInitialState(),
    initialPlatforms
  );

const platformsSlice = createSlice({
  name: "platforms",

  initialState,

  reducers: {
    addPlatform(state, action) {
      platformsAdapter.addOne(
        state,
        action.payload
      );
    },

    updatePlatform(state, action) {
      platformsAdapter.updateOne(
        state,
        {
          id: action.payload.id,
          changes: action.payload,
        }
      );
    },

    removePlatform(state, action) {
      platformsAdapter.removeOne(
        state,
        action.payload
      );
    },
  },
});

export const {
  addPlatform,
  updatePlatform,
  removePlatform,
} = platformsSlice.actions;

export const {
  selectAll: selectAllPlatforms,
  selectById: selectPlatformById,
} = platformsAdapter.getSelectors(
  (state) => state.platforms
);

export default platformsSlice.reducer;