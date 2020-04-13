import React from "react";
import Loader from "./Loader";

const ContentLoading = ({ text }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Loader text={text} />
    </div>
  );
};

export default ContentLoading;
