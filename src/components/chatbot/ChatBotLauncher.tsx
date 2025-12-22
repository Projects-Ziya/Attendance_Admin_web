import React, { useState } from "react";
import ChatBot from "../../views/Chatbot/ChatBot";
import botIcon from "../../assets/icons/chatbot/bot_icon.svg";

const ChatBotLauncher: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-[#1B84FF] rounded-full w-[60px] h-[60px] flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <img src={botIcon} alt="ChatBot" className="w-[30px] h-[30px]" />
        </button>
      )}

      {/* ✅ ChatBot Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default ChatBotLauncher;
