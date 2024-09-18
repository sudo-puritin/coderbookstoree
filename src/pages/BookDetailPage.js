import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import {
  Container,
  Box,
  Stack,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBookData } from "../features/bookDetail/bookDetailSlice";
import BookAdd from "../features/bookDetail/BookAdd";

const BookDetailPage = () => {
  const { book, isLoading } = useSelector((state) => state.bookDetail);

  const dispatch = useDispatch();

  const params = useParams();

  const bookId = params.id;

  useEffect(() => {
    dispatch(getBookData(bookId));
  }, [bookId, dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && <img width="100%" src={book.imageLink} alt="" />}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <BookAdd book={book} />
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
