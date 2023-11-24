import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import CVPage from "./Pages/CVPage";
import CVView from "./Components/CV/CVEdit/CVView";
import RegisterPage from "./Pages/RegisterPage";
import App from "./App";
// import TestPage from "./Components/TestPage/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cv", element: <CVPage /> },
      { path: `cv/:id`, element: <CVView /> },
      { path: "register-page", element: <RegisterPage /> },
      // { path: "test-page", element: <TestPage /> },
    ],
  },
]);
export default router;
