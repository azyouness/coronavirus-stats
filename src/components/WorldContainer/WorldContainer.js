import React from "react";
import { useAsync } from "react-async";
// components
import WorldContent from "./../WorldContent";
import ContentLoading from "./../Feedback/ContentLoading";
import ContentLoadingError from "./../Feedback/ContentLoadingError";
// libs, ...
import { loadLatest } from "./../../api";

export default () => {
  const { data, error, isPending } = useAsync({ promiseFn: loadLatest });

  if (isPending) {
    return <ContentLoading text="Loading latest worldwide data ..." />;
  }

  if (error) {
    return <ContentLoadingError />;
  }

  if (data) {
    const { latest } = data;
    return <WorldContent latest={latest} />;
  }

  return null;
};
