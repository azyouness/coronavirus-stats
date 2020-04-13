import React from "react";
import PropTypes from "prop-types";

import CounterItem from "./CounterItem";
import "./Counter.scss";

const Counter = ({ type, latest }) => {
  const { confirmed, recovered, deaths } = latest;

  return (
    <div className={type === "world" ? "world-counter" : "country-counter"}>
      <CounterItem type="confirmed" value={confirmed} />
      <CounterItem type="recovered" value={recovered} />
      <CounterItem type="deaths" value={deaths} />
    </div>
  );
};

Counter.propTypes = {
  type: PropTypes.oneOf(["world", "country"]).isRequired,
  latest: PropTypes.exact({
    confirmed: PropTypes.number,
    recovered: PropTypes.number,
    deaths: PropTypes.number,
  }).isRequired,
};

export default Counter;
