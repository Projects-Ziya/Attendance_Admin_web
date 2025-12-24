// src/components/ChatBot.tsx
import React from "react";
import Chatboticon from "../../assets/icons/chatbot/bot_icon.svg";
import chat_icon from "../../assets/icons/chatbot/chaticon.svg";
import team_icon from "../../assets/icons/chatbot/clock.svg";
import clock_icon from "../../assets/icons/chatbot/teamicon.svg";

import { useChatBotVM } from "../../viewmodels/chatbot/useChatBotVM";
import ChatTab from "../../components/chatbot/ChatTab";
import TeamTab from "../../components/chatbot/TeamTab";
import HistoryTab from "../../components/chatbot/HistoryTab";

const ChatBot: React.FC<{ closeChatbot: () => void }> = ({ closeChatbot }) => {
  const {
    activeTab,
    activeConversation,
    teamConversations,
    composerText,
    setActiveTab,
    setComposerText,
    pillClasses,
    selectConversation,
    sendMessage,
    handleComposerKeyDown,
    formatMinutesAgo,
   
  } = useChatBotVM();

  return (
    <div className=" flex min-h-screen items-center justify-center">
      <div>
        {/* HEADER */}
        <div className="bg-[#00A0E3] h-[91px] w-[463px] rounded-tl-[15px] rounded-tr-[15px]">
          <div className="flex justify-between">
            <div className="flex pt-[24px] pl-[37px]">
              <img className="h-[40px] w-[40px]" src={Chatboticon} alt="" />
              <p className="text-[30px] font-[400] text-white pl-[26px]">
                Chats
              </p>
            </div>
            <button onClick={ closeChatbot} className="text-[35px] font-[400] pt-[10px] text-white pr-[26px] hover:opacity-80 active:scale-95 transition">
              x
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-[#F6F5FA] flex items-center w-[463px] h-[65px] px-[37px] gap-6">
          {/* Chat tab */}
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-4 py-2 ${pillClasses(
              "chat"
            )}`}
          >
            <img
              className="h-[17px] w-[18px]"
              src={chat_icon}
              alt="chat icon"
            />
            <span className="text-[16px] font-[400] text-[#4C4949]">Chat</span>
          </button>

          {/* History tab */}
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-2 ${pillClasses(
              "history"
            )}`}
          >
            <img
              className="h-[22px] w-[20px]"
              src={clock_icon}
              alt="history icon"
            />
            <span className="text-[16px] font-[400] text-[#4C4949]">
              History
            </span>
          </button>

          {/* Team tab */}
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-4 py-2 ${pillClasses(
              "team"
            )}`}
          >
            <img className="h-[23px] w-[23px]" src={team_icon} alt="team" />
            <span className="text-[16px] font-[400] text-[#4C4949]">Team</span>
          </button>
        </div>

        {/* BODY */}
        <div className="h-[547px] w-[463px] shadow-lg bg-white border">
          {activeTab === "history" && <HistoryTab />}

          {activeTab === "chat" && (
            <ChatTab
              conversation={activeConversation}
              composerText={composerText}
              onComposerChange={setComposerText}
              onComposerKeyDown={handleComposerKeyDown}
              onSend={sendMessage}
            />
          )}

          {activeTab === "team" && (
            <TeamTab
              teams={teamConversations}
              onSelectTeam={selectConversation}
              formatMinutesAgo={formatMinutesAgo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
