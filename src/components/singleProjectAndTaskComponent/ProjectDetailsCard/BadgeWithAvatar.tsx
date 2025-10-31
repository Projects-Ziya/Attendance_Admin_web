import React from 'react';
import type { Member } from '../../models/ProjectModel';
import CircleImage from '../CircleImage';

interface BadgeWithAvatarProps {
  member: Member;
  avatarSize?: number;            // optional size for CircleImage
  textClassName?: string;         // optional text styling
  className?: string;             // optional wrapper styling
}

const BadgeWithAvatar: React.FC<BadgeWithAvatarProps> = ({
  member,
  avatarSize = 22,                
  textClassName = "text-xs text-[#4D4D4D]",
  className = "",
}) => {
  return (
    <div
      className={`flex h-[38px]  items-center w-fit gap-2 bg-[#F3F4F6] rounded-md ${className}`}
    >
      <CircleImage src={member.avatar} alt={member.name} size={avatarSize} />
      <span className={`${textClassName} whitespace-nowrap`}>{member.name}</span>
    </div>
  );
};

export default BadgeWithAvatar;
