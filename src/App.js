import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./assets/global.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
