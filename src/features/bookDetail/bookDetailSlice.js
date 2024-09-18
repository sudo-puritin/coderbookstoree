import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  book: null,
};

const slice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookDataSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.book = action.payload;
    },
    postBookToReadingListSuccess(state) {
      state.isLoading = false;
      state.error = null;
      toast.success("The book has been added to the reading list!");
    },
  },
});

export default slice.reducer;

export const getBookData = (bookId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/books/${bookId}`);
    dispatch(slice.actions.getBookDataSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const postBookToReadingList = (book) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/favorites", book);
    dispatch(slice.actions.postBookToReadingListSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
