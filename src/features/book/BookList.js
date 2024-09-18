import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../components/form";

import PaginationBar from "../../components/PaginationBar";
import SearchForm from "../../components/SearchForm";

import { getBooks } from "./bookSlice";

import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function BookList() {
  const [pageNum, setPageNum] = useState(1);

  const [query, setQuery] = useState("");

  const { books, isLoading, error, totalPage } = useSelector(
    (state) => state.book
  );

  const defaultValues = {
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    setQuery(data.searchQuery);
    const query = data.searchQuery.trim();
    dispatch(getBooks({ pageNum: pageNum, query: query }));
  };

  const navigate = useNavigate();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks({ pageNum: pageNum, query: query }));
  }, [pageNum, query, dispatch]);

  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Book Store
        </Typography>
        {error && <Alert severity="danger">{error}</Alert>}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <SearchForm />
          </Stack>
        </FormProvider>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPage}
        />
      </Stack>
      <div>
        {isLoading ? (
          <Box sx={{ textAlign: "center", color: "primary.main" }}>
            <ClipLoader color="inherit" size={150} loading={true} />
          </Box>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            flexWrap="wrap"
          >
            {books?.map((book) => (
              <Card
                key={book.id}
                onClick={() => handleClickBook(book.id)}
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
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </div>
    </Container>
  );
}

export default BookList;
