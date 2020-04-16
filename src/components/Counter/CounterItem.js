import React from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup";
// icons
import { IoIosCloseCircleOutline as DeathsIcon } from "react-icons/io";
import { IoIosCheckmarkCircleOutline as RecoveredIcon } from "react-icons/io";
import { IoIosRemoveCircleOutline as ConfirmedIcon } from "react-icons/io";


const CounterItem = ({ type, value }) => {
  let Icon = null;
  let label = "";

  if (type === "confirmed") {
    Icon = ConfirmedIcon;
    label = "Confirmed";
  } else if (type === "recovered") {
    Icon = RecoveredIcon;
    label = "Recovered";
  } else if (type === "deaths") {
    Icon = DeathsIcon;
    label = "Deaths";
  }

  return (
    <div className={`counter-item ${type}`}>
      <div className="counter-item-icon">
        <Icon />
      </div>
      <div className="counter-item-label">
        {label}
      </div>
      <div className="counter-item-value">
        {value ? <CountUp end={value} separator=" " /> : "- - -"}
      </div>
    </div>
  );
};

CounterItem.propTypes = {
  type: PropTypes.oneOf(["confirmed", "recovered", "deaths"]).isRequired,
  value: PropTypes.number.isRequired,
};

export default CounterItem;
