import React from 'react';
import type { TeamMember } from '../../models/employeeDashboad/index';

// import your saved SVGs
import PhoneIcon from '../../assets/employeeDashboard/phone.svg';
import MessageIcon from '../../assets/employeeDashboard/messageicon.svg';

type Props = {
  member: TeamMember;
  onCall?: (m: TeamMember) => void;
  onMessage?: (m: TeamMember) => void;
};

export const TeamMemberCard: React.FC<Props> = ({ member, onCall, onMessage }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm w-[462px] h-[79px] border">
      {/* Left side: avatar + name/role */}
      <div className="flex items-center space-x-3">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={member.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'}
          alt={member.name}
        />
        <div>
          <div className="text-sm font-medium text-gray-900">{member.name}</div>
          <div className="text-xs text-gray-500">{member.role}</div>
        </div>
      </div>

      {/* Right side: phone + message buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onMessage?.(member)}
          aria-label={`Message ${member.name}`}
          className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <img src={MessageIcon} alt="message" className="h-[19px] w-[20px]" />
        </button>
        <button
          type="button"
          onClick={() => onCall?.(member)}
          aria-label={`Call ${member.name}`} 
          className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <img src={PhoneIcon} alt="call" className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
};
