import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <>
      <div className="loader-view">
        <Spinner animation="border" variant="info" />
      </div>
    </>
  );
};

export default Loader;
