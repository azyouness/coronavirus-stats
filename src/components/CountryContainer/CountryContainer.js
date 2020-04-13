import React from "react";
import { useAsync } from "react-async";
// components
import CountryContent from "./../CountryContent";
import ContentLoading from "./../Feedback/ContentLoading";
import ContentLoadingError from "./../Feedback/ContentLoadingError";
// styles, libs, ...
import { loadLocationsByCountry } from "./../../api";

export default ({ country }) => {
  let { data, error, isPending } = useAsync({
    promiseFn: loadLocationsByCountry,
    countryCode: country.code,
  });

  if (isPending) {
    return <ContentLoading text={`Loading latest ${country.name} data ...`} />;
  }

  if (error) {
    return <ContentLoadingError />;
  }

  if (data) {
    const { latest, locations } = data;
    // ignore the headash coming with countries with many locations :/
    const timelines = locations.length === 1 ? locations[0].timelines : {};
    return (
      <CountryContent latest={latest} country={country} timelines={timelines} />
    );
  }

  return null;
};
