import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../redux/postreducer';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
