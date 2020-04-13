import React from "react";
// components
import Counter from "./../Counter/Counter";
import TotalCasesPieChart from "./../TotalCasesPieChart";
import { extractLatestCasesChartData } from "./../../utils";
import styles from "./LatestSection.module.scss";

const LatestSection = ({ latest }) => {
  return (
    <div className={styles.section}>
      <div className={styles.counter}>
        <Counter type="country" latest={latest} />
      </div>
      <div className={styles.chart}>
        <TotalCasesPieChart
          data={extractLatestCasesChartData(latest)}
          pieProps={{ outerRadius: "80%", innerRadius: "70%" }}
          respoWidth={1280}
        />
      </div>
    </div>
  );
};

export default LatestSection;
