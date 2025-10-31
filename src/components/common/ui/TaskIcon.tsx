import React from "react";

const TaskIcon: React.FC = () => (
  <div
      style={{
        width: 38,
        height: 38,
        background: "conic-gradient(from 180deg at 50% 50%, #94C21A 0deg, #00A0E3 360deg)",
      }}
      className="rounded-md mt-[6px] [clip-path:polygon(50%_0%,_95%_25%,_95%_75%,_50%_100%,_5%_75%,_5%_25%)]"
    />
);

export default TaskIcon;
