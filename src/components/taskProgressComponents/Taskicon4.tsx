import React from "react";

interface TaskIconProps {
  size?: number;
  color?: string;
}

const TaskIcon4: React.FC<TaskIconProps> = ({ size = 32, color = "red" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer rounded rectangle (clipboard shape) */}
      <rect x="4" y="3" width="16" height="18" rx="2" ry="2" strokeWidth="1" />
      <rect x="8" y="3" width="7" height="3" rx="2" ry="2" strokeWidth="1" />

      {/* ❌ X mark (two crossing lines) */}
      <line
        x1="7" y1="8.5"
        x2="9" y2="12"
        strokeWidth="0.8"
      />
      <line
        x1="9" y1="8.5"
        x2="7" y2="12"
        strokeWidth="0.8"
      />

      {/* ✅ Horizontal lines (thinner) */}
      <line
        x1="13"
        y1="10.9"
        x2="16"
        y2="10.9"
        stroke="red"
        strokeWidth="0.8"
      />

      <line
        x1="7.5"
        y1="14.9"
        x2="8"
        y2="14.9"
        stroke="red"
        strokeWidth="0.8"
      />

      <line
        x1="13"
        y1="14.9"
        x2="16"
        y2="14.9"
        stroke="red"
        strokeWidth="0.8"
      />
    </svg>
  );
};

export default TaskIcon4;
