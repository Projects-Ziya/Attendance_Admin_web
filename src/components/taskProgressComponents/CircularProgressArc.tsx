import React, { useState, useEffect } from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number; // acts as "base size"
  strokeWidth?: number;
  color?: string;
  trailColor?: string;
  color2?: string;
  color3?: string;
  animateOnLoad?: boolean;
  animationDuration?: number;
  className?: string; // optional Tailwind classes
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 220, // base reference
  strokeWidth = 18,
  color = "#4f46e5",
  color2 = "red",
  color3 = "white",
  trailColor = "#ede9fe",
  animateOnLoad = true,
  animationDuration = 1000,
  className = "w-full max-w-[300px] aspect-square", // responsive sizing
}) => {
  const [isLoading, setIsLoading] = useState(animateOnLoad);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (animateOnLoad) {
      setIsLoading(true);
      const startTime = Date.now();
      const initialPercentage = 0;

      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentPercentage =
          initialPercentage + (percentage - initialPercentage) * easedProgress;

        setAnimatedPercentage(currentPercentage);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsLoading(false);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setAnimatedPercentage(percentage);
    }
  }, [percentage, animateOnLoad, animationDuration]);

  const radius = (size - strokeWidth) / 2;
  const displayPercentage = animateOnLoad ? animatedPercentage : percentage;

  const polarToCartesian = (angle: number, r: number = radius) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: size / 2 + r * Math.cos(rad),
      y: size / 2 + r * Math.sin(rad),
    };
  };

  const startAngle = -90;
  const endAngle = startAngle + (360 * displayPercentage) / 100;

  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);

  const largeArcFlag = displayPercentage > 50 ? 1 : 0;
  const sweepFlag = 1;

  // ✅ Handle 100% case (draw a full circle)
  const d =
    Math.round(displayPercentage) >= 100
      ? `
        M ${size / 2}, ${size / 2 - radius}
        A ${radius},${radius} 0 1,1 ${size / 2 - 0.01},${size / 2 - radius}
      `
      : [
          "M",
          start.x,
          start.y,
          "A",
          radius,
          radius,
          0,
          largeArcFlag,
          sweepFlag,
          end.x,
          end.y,
        ].join(" ");

  const endInner = polarToCartesian(endAngle, radius - strokeWidth * 0.5);
  const startInner = polarToCartesian(startAngle, radius - strokeWidth * 0.5);

  const quarterArc = (cx: number, cy: number, size: number, rotation: number) => {
    const r = size / 2;
    const sAngle = rotation;
    const eAngle = rotation + 97;

    const start = {
      x: cx + r * Math.cos((sAngle * Math.PI) / 180),
      y: cy + r * Math.sin((sAngle * Math.PI) / 180),
    };

    const end = {
      x: cx + r * Math.cos((eAngle * Math.PI) / 180),
      y: cy + r * Math.sin((eAngle * Math.PI) / 180),
    };

    return `
      M ${cx},${cy}
      L ${start.x},${start.y}
      A ${r},${r} 0 0,1 ${end.x},${end.y}
      Z
    `;
  };

  const quarterArc2 = (
    cx: number,
    cy: number,
    size: number,
    rotation: number,
    direction: 1 | -1 = 1
  ) => {
    const r = size / 2;
    const sAngle = rotation;
    const eAngle = rotation - direction * 100;

    const start = {
      x: cx + r * Math.cos((sAngle * Math.PI) / 180),
      y: cy + r * Math.sin((sAngle * Math.PI) / 180),
    };

    const end = {
      x: cx + r * Math.cos((eAngle * Math.PI) / 180),
      y: cy + r * Math.sin((eAngle * Math.PI) / 180),
    };

    return `
      M ${cx},${cy}
      L ${start.x},${start.y}
      A ${r},${r} 0 0,${direction === 1 ? 1 : 0} ${end.x},${end.y}
      Z
    `;
  };

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {/* Background circle */}
        <circle
          stroke={trailColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Main progress arc */}
        {displayPercentage > 0 && (
          <path
            d={d}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Decorative arcs */}
        <path
          d={quarterArc2(startInner.x, startInner.y, strokeWidth * 1.95, startAngle, -1)}
          fill={color3}
        />

        <path
          d={quarterArc(endInner.x, endInner.y, strokeWidth * 2.05, endAngle)}
          fill={color}
        />

        {/* Percentage Text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize={`${size * 0.18}`}
          fill="gray"
        >
          {Math.round(displayPercentage).toString().padStart(2, "0")}% 
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
