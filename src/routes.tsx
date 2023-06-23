import { createBrowserRouter } from "react-router-dom";
import { useParams } from "react-router";
import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import CVCreate from "./Pages/CVCreate";
import CVPage from "./Pages/CVPage";
import CVView from "./Components/CV/CVSectionCardSubComponents/CVView";
// import TestPage from "./Components/TestPage/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cv", element: <CVPage /> },
      { path: "cv-create", element: <CVCreate /> },
      { path: `cv/:id`, element: <CVView /> },
      // { path: "test-page", element: <TestPage /> },
    ],
  },
]);
export default router;
