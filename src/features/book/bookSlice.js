import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { NUMBER_BOOKS_PER_PAGE, NUMBER_TOTAL_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  books: [],
  totalPage: NUMBER_TOTAL_PAGE,
  limit: NUMBER_BOOKS_PER_PAGE,
};

const slice = createSlice({
  name: "book",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.books = action.payload;
    },
  },
});

export const getBooks =
  ({ pageNum, limit = NUMBER_BOOKS_PER_PAGE, query }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const queryUrl = query && `&q=${query}`;
      const response = await apiService.get(
        `/books?_page=${pageNum}&_limit=${limit}${queryUrl}`
      );
      dispatch(slice.actions.getBookSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
