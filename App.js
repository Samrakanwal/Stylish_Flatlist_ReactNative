import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import PostsList from './src/screen/PostList';

export default function App() {
  return (
    <Provider store={store}>
      <PostsList />
    </Provider>
  );
}
