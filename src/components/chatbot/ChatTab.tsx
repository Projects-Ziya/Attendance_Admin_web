// src/components/ChatTab.tsx
import React, { useEffect, useRef } from "react";
import type { Conversation } from "../../models/chatbot/Chatbot";

interface ChatTabProps {
  conversation: Conversation | undefined;
  composerText: string;
  onComposerChange: (value: string) => void;
  onComposerKeyDown: (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  onSend: () => void;
}

const ChatTab: React.FC<ChatTabProps> = ({
  conversation,
  composerText,
  onComposerChange,
  onComposerKeyDown,
  onSend,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageCount = conversation?.messages.length ?? 0;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageCount]);

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Select a conversation to start chatting.
      </div>
    );
  }

  const { participant, messages } = conversation;

  return (
    <div className="h-full flex flex-col">
      {/* chat header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#E6E6E6] flex items-center justify-center text-sm font-medium">
            {participant.avatarInitials}
          </div>
          <div>
            <p className="text-[15px] font-[500]">{participant.name}</p>
            {participant.status && (
              <p className="text-xs text-gray-400">{participant.status}</p>
            )}
          </div>
        </div>
        <button className="text-xl text-gray-500 hover:text-gray-700">
          ⋮
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <div className="mr-2">
                  <div className="h-8 w-8 rounded-full bg-[#1B84FF] text-white text-xs flex items-center justify-center">
                    {participant.avatarInitials[0]}
                  </div>
                </div>
              )}

              <div className="max-w-[70%]">
                <div
                  className={`rounded-2xl px-4 py-2 text-sm ${
                    isMe ? "bg-[#F6F5FA]" : "bg-white shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <p
                  className={`text-[10px] mt-1 text-gray-400 ${
                    isMe ? "text-right" : "text-left"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}

        {/* bottom marker for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* composer */}
      <div className="border-t px-4 py-3 flex items-center gap-3">
        <textarea
          className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1B84FF]"
          rows={1}
          placeholder="Type a message..."
          value={composerText}
          onChange={(e) => onComposerChange(e.target.value)}
          onKeyDown={onComposerKeyDown}
        />
        <button
          onClick={onSend}
          className="h-9 w-9 rounded-md bg-black flex items-center justify-center hover:opacity-90 active:scale-95"
        >
          <span className="text-white text-xs">➤</span>
        </button>
      </div>
    </div>
  );
};

export default ChatTab;
