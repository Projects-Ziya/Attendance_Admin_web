import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color, icon }) => {
  return (
    <div className="flex flex-col gap-4 justify-between bg-white shadow-sm px-9 py-8 pb-11 rounded-[10px] border border-gray-200">
      <p className="text-xl text-ziyablack font-medium">{title}</p>
      <div className="flex items-center gap-5">
        <h2 className={`text-3xl font-semibold ${color}`}>{value}</h2>
        <span className="w-8 h-8 flex items-center justify-center">{icon}</span>
      </div>
    </div>

  );
};

export default StatsCard;
