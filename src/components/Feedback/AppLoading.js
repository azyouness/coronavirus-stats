import React from 'react';
import Loader from "./Loader";

const AppLoading = ({ text = "Loading App ..." }) => {
  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Loader text={text} />
    </div>
  );
};

export default AppLoading;