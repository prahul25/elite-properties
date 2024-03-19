// selectors.js

// Define selector functions to extract data from Redux store
export const selectAiData = (state) => state.aiData.data;
export const selectAiDataError = (state) => state.aiData.error;
