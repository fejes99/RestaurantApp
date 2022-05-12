import { configureStore } from '@reduxjs/toolkit';
import { productListReducer } from './reducers/productReducers';

const store = configureStore({
  reducer: {
    products: productListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['PRODUCT_LIST_SUCCESS'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
