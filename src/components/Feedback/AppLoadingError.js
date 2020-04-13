import React from "react";

const AppLoadingError = () => {
  return (
    <p
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        color: "rgba(255, 255, 255, .5)",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      Error .. We can't fetch data from the Covid-19 data source
      <br />
      Please refresh page
    </p>
  );
};

export default AppLoadingError;
