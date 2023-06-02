import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
