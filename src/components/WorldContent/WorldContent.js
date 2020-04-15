import React from "react";
// components
import ContentTitle from "./../ContentTitle";
import { Counter } from "./../Counter";
import TotalCasesPieChart from "./../TotalCasesPieChart";
// libs, ...
import { extractLatestCasesChartData } from "./../../utils";
import styles from "./WorldContent.module.scss";

export default ({ latest }) => (
  <div className={styles.content}>
    <ContentTitle>World Now</ContentTitle>
    <div className={styles.counter}>
      <Counter type="world" latest={latest} />
    </div>
    <div className={styles.chart}>
      <TotalCasesPieChart
        data={extractLatestCasesChartData(latest)}
        pieProps={{ outerRadius: "95%", innerRadius: "85%" }}
      />
    </div>
  </div>
);
