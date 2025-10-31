import React from "react";

interface PieProgressProps {
  size?: number; // overall size
  strokeColor?: string; // outline color
  fillColor?: string; // sector fill color
  backgroundColor?: string; // background inside circle
  percentage?: number; // 0-100
  gap?: number; // white gap size
}

const PieProgress: React.FC<PieProgressProps> = ({
  size = 35,
  strokeColor = "#0EA5E9",
  fillColor = "#0EA5E9",
  backgroundColor = "#E0F2FE",
  percentage = 25,
  gap = 4, // <-- space between sector and border
}) => {
  const radius = size / 2;
  const innerRadius = radius - gap; // sector radius (smaller)
  const angle = (percentage / 100) * 360;
  const radians = (Math.PI / 180) * (angle - 90);

  // Endpoint of the arc
  const x = radius + innerRadius * Math.cos(radians);
  const y = radius + innerRadius * Math.sin(radians);

  const largeArcFlag = percentage > 50 ? 1 : 0;

  const pathData = `
    M ${radius},${radius}
    L ${radius},${radius - innerRadius}
    A ${innerRadius},${innerRadius} 0 ${largeArcFlag},1 ${x},${y}
    Z
  `;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle cx={radius} cy={radius} r={radius} fill={backgroundColor} />

      {/* Outline */}
      <circle
        cx={radius}
        cy={radius}
        r={radius - 1}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />

      {/* Progress sector with white gap */}
      <path d={pathData} fill={fillColor} />
    </svg>
  );
};

export default PieProgress;
