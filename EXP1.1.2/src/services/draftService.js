const STORAGE_KEY = "social_media_drafts";

/*
  Small helper to simulate network delay.
  This makes our frontend behave like it is
  communicating with a backend API.
*/
const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getStoredDrafts = () => {
  try {
    const storedDrafts = localStorage.getItem(STORAGE_KEY);

    return storedDrafts ? JSON.parse(storedDrafts) : [];
  } catch (error) {
    console.error("Failed to read drafts:", error);
    return [];
  }
};

const saveStoredDrafts = (drafts) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(drafts)
  );
};

/*
  GET /drafts
*/
export const getDrafts = async () => {
  await delay();

  return getStoredDrafts();
};

/*
  POST /drafts
*/
export const createDraft = async (draftData) => {
  await delay();

  const drafts = getStoredDrafts();

  const newDraft = {
    id: crypto.randomUUID(),
    title: draftData.title,
    content: draftData.content,
    platform: draftData.platform,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedDrafts = [
    newDraft,
    ...drafts,
  ];

  saveStoredDrafts(updatedDrafts);

  return newDraft;
};

/*
  PUT /drafts/:id
*/
export const updateDraft = async (
  id,
  updatedData
) => {
  await delay();

  const drafts = getStoredDrafts();

  const updatedDrafts = drafts.map((draft) =>
    draft.id === id
      ? {
          ...draft,
          ...updatedData,
          updatedAt: new Date().toISOString(),
        }
      : draft
  );

  saveStoredDrafts(updatedDrafts);

  return updatedDrafts.find(
    (draft) => draft.id === id
  );
};

/*
  DELETE /drafts/:id
*/
export const deleteDraft = async (id) => {
  await delay();

  const drafts = getStoredDrafts();

  const updatedDrafts = drafts.filter(
    (draft) => draft.id !== id
  );

  saveStoredDrafts(updatedDrafts);

  return true;
};