import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { AuthProvider } from "./AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
