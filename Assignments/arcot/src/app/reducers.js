// reducers.js

// Import combineReducers function from Redux
import { combineReducers } from 'redux';

// Import action type constants
import { FETCH_AI_DATA_SUCCESS, FETCH_AI_DATA_FAILURE } from './actionTypes';

// Define initial state for AI data
const initialAiDataState = {
  data: null,
  error: null,
};

// Define reducer function for AI data
const aiDataReducer = (state = initialAiDataState, action) => {
  switch (action.type) {
    case FETCH_AI_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_AI_DATA_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Combine all reducers into a root reducer
export default combineReducers({
  aiData: aiDataReducer, // aiData reducer manages AI data state
});
