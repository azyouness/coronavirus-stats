import React from "react";
// components
import ContentTitle from "./../ContentTitle";
import LatestSection from "./LatestSection";
import TimelinesSection from "./TimelinesSection";
// styles, libs, ...
import { extractTimelinesChartData } from "./../../utils";

export default ({ country, latest, timelines }) => (
  <>
    <ContentTitle>{country.name}</ContentTitle>
    <div>
      <LatestSection country={country} latest={latest} />
    </div>
    <div style={{ marginTop: 80 }}>
      <TimelinesSection
        country={country}
        chartData={
          timelines.confirmed ? extractTimelinesChartData(timelines) : []
        }
      />
    </div>
  </>
);
