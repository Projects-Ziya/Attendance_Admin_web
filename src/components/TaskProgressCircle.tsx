import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function TaskProgressCircle({
  value = 0,
  formattedValue = "0%",
  color = "#6c5ce7",
}) {
  return (
    <div style={{ width: 210, height: 210 }}>
      <CircularProgressbar
        value={value}
        text={formattedValue}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#f3eefc",
          textColor: "#a7a7a7",
          textSize: "18px",
          strokeLinecap: "butt",
        })}
      />
    </div>
  );
}

