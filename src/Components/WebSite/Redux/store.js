import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './ShoppingReducer';

const store = configureStore({
  reducer: shoppingReducer,
});

export default store;
