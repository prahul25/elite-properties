// actions.js

// Import action type constants
import { FETCH_AI_DATA_SUCCESS, FETCH_AI_DATA_FAILURE } from './actionTypes';

// Define action creator functions for fetching AI data
export const fetchAiDataSuccess = (data) => ({
  type: FETCH_AI_DATA_SUCCESS,
  payload: data,
});

export const fetchAiDataFailure = (error) => ({
  type: FETCH_AI_DATA_FAILURE,
  payload: error,
});

// Asynchronous action creator for fetching AI data
export const fetchAiData = () => {
  return async (dispatch) => {
    try {
      // Simulate fetching data from an API
      const response = await fetch('/ai-data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Dispatch success action with fetched data
      dispatch(fetchAiDataSuccess(data));
    } catch (error) {
      // Dispatch failure action with error message
      dispatch(fetchAiDataFailure(error.message));
    }
  };
};
