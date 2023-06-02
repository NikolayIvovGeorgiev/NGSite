// import React from "react";
// import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../Components/NavBar";

const ErrorPage = () => {
  // const error = useRouteError();

  return (
    <>
      <NavBar />
      {/* <Box padding={10}>
        <Heading>Oops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </Text>
      </Box> */}
    </>
  );
};

export default ErrorPage;
