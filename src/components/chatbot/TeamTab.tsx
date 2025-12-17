// src/components/TeamTab.tsx
import React from "react";
import type { Conversation } from "../model/ChatBot";

interface TeamTabProps {
  teams: Conversation[];
  onSelectTeam: (id: string) => void;
  formatMinutesAgo: (mins: number) => string;
}

const TeamTab: React.FC<TeamTabProps> = ({
  teams,
  onSelectTeam,
  formatMinutesAgo,
}) => {
  if (!teams.length) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        No teams yet.
      </div>
    );
  }

  return (
    <div className="h-full px-6 py-4 space-y-4">
      {teams.map((team) => (
        <button
          key={team.id}
          onClick={() => onSelectTeam(team.id)}
          className="w-full flex items-center justify-between py-3 rounded-xl hover:bg-[#F6F5FA] transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#E3F1FF] flex items-center justify-center text-sm">
              {team.participant.avatarInitials}
            </div>
            <div>
              <p className="text-[15px] font-[500]">
                {team.participant.name}
              </p>
              <p className="text-xs text-gray-400">
                {team.lastMessagePreview}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-400">
              {formatMinutesAgo(team.lastActivityMinutesAgo)}
            </span>
            {team.unreadCount > 0 && (
              <div className="h-5 w-5 rounded-full bg-gray-200 text-xs flex items-center justify-center">
                {team.unreadCount}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TeamTab;
