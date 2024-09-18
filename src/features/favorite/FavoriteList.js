import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { ClipLoader } from "react-spinners";

import { getFavoriteBooks, removeFavoriteBooks } from "./favoriteSlice";

function FavoriteList() {
  const { books, isLoading } = useSelector((state) => state.favorite);

  const [removedBookId, setRemovedBookId] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleRemovedBook = (bookId) => {
    setRemovedBookId(bookId);

    dispatch(removeFavoriteBooks({ removedBookId: bookId })).then(() => {
      dispatch(getFavoriteBooks());
    });
  };

  useEffect(() => {
    if (removedBookId) return;
    dispatch(getFavoriteBooks());
  }, [removedBookId, dispatch]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Book Store
      </Typography>
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {books.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {book.author}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={() => handleRemovedBook(book.id)}
                  >
                    &times;
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}

export default FavoriteList;
