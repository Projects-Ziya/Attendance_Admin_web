import React from "react";
import type { Member } from "../../models/ProjectModel";
import BadgeWithAvatar from "./BadgeWithAvatar";
import AddNewButton from "./AddNewButton";
import DetailRow from "./DetailRow";

interface MemberSectionProps {
  title: string;
  members: Member[];
  gridCols?: number; 
  className?: string;  
}

const MemberSection: React.FC<MemberSectionProps> = ({
  title,
  members,
  gridCols = 3,
  className,
}) => {
  // Explicit mapping for supported Tailwind grid classes
  const gridClassMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const gridClass = gridClassMap[gridCols] || "grid-cols-2";

  return (
    <DetailRow
    className={className}
      label={title}
      value={
        <div className={`grid ${gridClass} gap-[10px] bg-white w-auto h-auto`}>
          {members.map((m) => (
            <BadgeWithAvatar key={m.id} member={m} className="py-2 px-3" />
          ))}
          <AddNewButton />
        </div>
      }
    />
  );
};

export default MemberSection;
