import React from "react";

import TimelinesChart from "./../TimelinesChart";
import styles from "./TimelinesSection.module.scss";

const TimelinesSection = ({ country, chartData }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>
        Cases graph starting from the first infection date
      </h3>
      { chartData.length ? (
        <div className={styles.chart}>
            <TimelinesChart data={chartData} />
        </div>
        ) : (
          <p className={styles.noTimelines}>
            {`Sorry day to day data not avaible for ${country.name} currently !`}
          </p>
        )}
    </div>
  );
};

export default TimelinesSection;
