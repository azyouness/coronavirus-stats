import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { APP_COLORS } from "./../../utils";


export default ({ data, pieProps = {}, respoWidth = 700 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRespo, setIsRespo] = useState(window.innerWidth < respoWidth);

  // Change activeShape based on screen width, ResponsiveContainer can't make activeShape responsive !
  const mql = window.matchMedia("(max-width: " + respoWidth + "px)");
  mql.addListener(mql => setIsRespo(mql.matches));

  // Chart colors
  const COLORS = [APP_COLORS.confirmed, APP_COLORS.recovered, APP_COLORS.deaths];

  // <=> On pie hover
  const onPieEnter = (data, index) => setActiveIndex(index);

  return (
    <ResponsiveContainer width="100%">
      <PieChart>
        <Pie
          data={data} 
          dataKey="value"
          startAngle={180}
          endAngle={-180}
          activeIndex={activeIndex} 
          activeShape={isRespo ? renderActiveShapeRespo : renderActiveShape}
          paddingAngle={3}
          onMouseEnter={onPieEnter}
          outerRadius="80%" 
          innerRadius="65%"
          {...pieProps}
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#FFF"} style={{ fontWeight: 600 }}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#EEE"
      >{`${value.toLocaleString()}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={fill}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

// for "small" devices
const renderActiveShapeRespo = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 25} dy={8} textAnchor="middle" fill={fill} style={{ fontWeight: 600 }}>
        {value.toLocaleString()}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#FFF"} style={{ fontWeight: 600 }}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 25} dy={8} textAnchor="middle" fill={fill} style={{ fontWeight: 600 }}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
}