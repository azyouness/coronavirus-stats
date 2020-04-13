import React from "react";

const ContentLoadingError = () => {
  return (
    <p
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        color: "rgba(255, 255, 255, .8)",
      }}
    >
      Error .. App can't get data from the used "Data Source" !<br />
      Try to refresh page
    </p>
  );
};

export default ContentLoadingError;
