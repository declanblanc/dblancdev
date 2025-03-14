import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "./App.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
