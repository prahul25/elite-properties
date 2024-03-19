// actionTypes.js
export const FETCH_AI_DATA_SUCCESS = "FETCH_AI_DATA_SUCCESS";
export const FETCH_AI_DATA_FAILURE = "FETCH_AI_DATA_FAILURE";

export const fetchAiDataFailure = (error) => ({
  type: FETCH_AI_DATA_FAILURE,
  payload: error,
});

export const fetchAiDataSuccess = (data) => ({
  type: FETCH_AI_DATA_SUCCESS,
  payload: data,
});
