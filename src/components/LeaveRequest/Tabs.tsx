// src/components/Tabs.jsx
import React from "react";

export default function Tabs({ activeTab, onChange }) {
  const base =
    "w-[687px] h-[65px] rounded-[6px] text-[17px] font-[600] flex items-center justify-center tracking-[1.28px]";
  const activeClasses = "bg-[#00A0E3] text-white";
  const inactiveClasses = "border border-[#00A0E3] text-[#00A0E3] bg-white";

  return (
    <div className="mb-6 flex items-center w-full  gap-3 p-5">
      <button
        onClick={() => onChange("leave")}
        className={`${base} ${activeTab === "leave" ? activeClasses : inactiveClasses}`}
      >
        Leave Requests
      </button>

      <button
        onClick={() => onChange("projects")}
        className={`${base} ${activeTab === "projects" ? activeClasses : inactiveClasses}`}
      >
        Project Approvals
      </button>
    </div>
  );
}