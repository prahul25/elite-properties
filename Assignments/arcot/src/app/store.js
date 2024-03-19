// store.js

// Import configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import root reducer from reducers.js
import rootReducer from './reducers';

// Configure and create Redux store
const store = configureStore({
  reducer: rootReducer, // Pass root reducer to configureStore function
});

// Export the created Redux store
export default store;
