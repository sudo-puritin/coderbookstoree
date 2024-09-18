import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  books: [],
  removedBookId: "",
};

const slice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getReadingBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.books = action.payload;
    },
    removeReadingBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      toast.success("The book has been removed");
    },
  },
});

export const getFavoriteBooks = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/favorites`);
    dispatch(slice.actions.getReadingBookSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const removeFavoriteBooks =
  ({ removedBookId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/favorites/${removedBookId}`);
      dispatch(slice.actions.removeReadingBookSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export default slice.reducer;
