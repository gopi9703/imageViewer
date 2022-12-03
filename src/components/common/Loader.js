import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <>
      <div className="loader_view d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="info" size="xl" />
      </div>
    </>
  );
};

export default Loader;
