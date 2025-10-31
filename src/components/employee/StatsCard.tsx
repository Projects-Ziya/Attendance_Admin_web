import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color, icon }) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-sm px-6 py-4 rounded-[10px] border border-gray-200 min-h-[90px]">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-50">
          <span className="inline-flex items-center justify-center w-8 h-8">{icon}</span>
        </div>
      <div className="flex flex-col leading-tight">
        <p className="text-lg text-gray-500 font-medium">{title}</p>
        <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;
