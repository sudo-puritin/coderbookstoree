import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "../features/book/bookSlice";
import favoriteReducer from "../features/favorite/favoriteSlice";
import bookDetailReducer from "../features/bookDetail/bookDetailSlice";

const rootReducer = {
  book: bookReducer,
  favorite: favoriteReducer,
  bookDetail: bookDetailReducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
