import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { APP_COLORS, kFormatter } from "./../../utils";


export default ({ data, chartProps = {} }) => {
  return (
    <ResponsiveContainer width="100%"/*  minWidth="600px" */>
      <LineChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }} {...chartProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, .1)" />
        <XAxis dataKey="date" height={80} tick={<CustomizedXAxisTick />} /* padding={{ left: 20, right: 25 }} */ />
        <YAxis tick={<CustomizedYAxisTick />} />
        <Tooltip content={CustomizeTooltip} />
        <Legend iconType="line" wrapperStyle={{ textTransform: "capitalize" }} />
        <Line type="monotone" dot={false} dataKey="confirmed" stroke={APP_COLORS.confirmed} strokeWidth="3px" />
        <Line type="monotone" dot={false} dataKey="recovered" stroke={APP_COLORS.recovered} strokeWidth="3px" />
        <Line type="monotone" dot={false} dataKey="deaths" stroke={APP_COLORS.deaths} strokeWidth="3px" />
      </LineChart>
    </ResponsiveContainer>
  );
};


const CustomizedXAxisTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize=".7rem"
      >
        {payload.value}
      </text>
    </g>
  );
};


const CustomizedYAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x - 5}, ${y})`}>
      <text textAnchor="end" fill="#666" fontSize=".9rem">
        {kFormatter(payload.value).toLocaleString()}
      </text>
    </g>
  );
};


const CustomizeTooltip = ({ payload }) => {
  if (payload.length === 0) {
    return null;
  }

  const [confirmed, recovered, deaths] = payload; // in that order !
  const date = confirmed.payload.date;
  const { color: cColor, value: cValue } = confirmed;
  const { color: rColor, value: rValue } = recovered;
  const { color: dColor, value: dValue } = deaths;

  const dateStyle = {
    color: "#444",
    fontSize: ".9rem",
    fontWeight: "600",
    paddingBottom: "4px",
    marginBottom: "8px",
    textAlign: "center",
    borderBottom: "1px solid #CCC",
  };
  const valuesStyle = {
    fontSize: ".9rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  };

  const ValueItem = ({ label, value, color }) => {
    return (
      <p style={{ ...valuesStyle, color }}>
        <span>{label}: </span>
        <span style={{ marginLeft: 10, flexGrow: 1, textAlign: "right" }}>
          {value.toLocaleString()}
        </span>
      </p>
    );
  };

  return (
    <div style={{ padding: "15px", borderRadius: 4, background: "#EEE" }}>
      <p style={dateStyle}>{date}</p>
      <ValueItem label="Confirmed" value={cValue} color={cColor} />
      <ValueItem label="Recovered" value={rValue} color={rColor} />
      <ValueItem label="Deaths" value={dValue} color={dColor} />
    </div>
  );
};
