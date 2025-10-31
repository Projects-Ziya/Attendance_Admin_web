import React from "react";

interface IconProps {
  className?: string;
}

const AddCircleWithDots: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
    >
      {/* Circle outline */}
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />

      {/* Plus sign */}
      <line x1="50" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="4" />
      <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="4" />

      {/* White dots along arc (90 to 180) */}
      <circle cx="50" cy="10" r="3" fill="white" />
      <circle cx="25" cy="25" r="3" fill="white" />
      <circle cx="10" cy="50" r="3" fill="white" />
    </svg>
  );
};

export default AddCircleWithDots;
