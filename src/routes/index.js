import React from "react";
import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import HomePage from "../pages/HomePage";
import ReadingPage from "../pages/ReadingPage";
import BlankLayout from "../layout/BlankLayout";
import NotFoundPage from "../pages/NotFoundPage";
import BookDetailPage from "../pages/BookDetailPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="reading" element={<ReadingPage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
