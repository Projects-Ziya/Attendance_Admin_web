import React from "react";
import CircleImage from "./CircleImage";

interface UserBadgeProps {
  avatar: string;
  name: string;
  size?: number; // avatar size
}

const UserBadge: React.FC<UserBadgeProps> = ({ avatar, name, size = 20 }) => {
  return (
    <div
      className="flex items-center bg-white text-gray-800 rounded-[5px] gap-[10px] w-fit"
      style={{ height: "38px", padding: "8px 12px" }}
    >
      <CircleImage src={avatar} alt={name} size={size} />
      <span className="text-xs font-medium">{name}</span>
    </div>
  );
};

export default UserBadge;
