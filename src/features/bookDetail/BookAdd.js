import React from "react";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { postBookToReadingList } from "./bookDetailSlice";

function BookAdd(book) {
  const dispatch = useDispatch();

  const addToReadingList = (book) => {
    dispatch(postBookToReadingList(book.book));
  };

  return (
    <Button
      variant="outlined"
      sx={{ width: "fit-content" }}
      onClick={() => {
        addToReadingList(book);
      }}
    >
      Add to Reading List
    </Button>
  );
}

export default BookAdd;
