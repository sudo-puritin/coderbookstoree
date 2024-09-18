import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import MThemeProvider from "./theme/MThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <MThemeProvider>
        <Router />
      </MThemeProvider>
    </BrowserRouter>
  );
}

export default App;
