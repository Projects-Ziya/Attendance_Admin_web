// src/viewmodel/useChatBotVM.ts
import { useMemo, useState } from "react";
import type React from "react";

// ⬇️ import types + mock data from your model file
import type { Tab, Conversation } from "../../models/chatbot/Chatbot";
import { initialConversations } from "../../models/chatbot/Chatbot";

export const useChatBotVM = () => {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selectedConversationId, setSelectedConversationId] =
    useState<string>("conv-sarah");
  const [composerText, setComposerText] = useState<string>("");

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === selectedConversationId),
    [conversations, selectedConversationId]
  );

  const teamConversations = useMemo(
    () => conversations.filter((c) => c.participant.type === "team"),
    [conversations]
  );

  const pillClasses = (tab: Tab) =>
    activeTab === tab
      ? "bg-white rounded-full shadow-sm"
      : "hover:bg-white/60 rounded-full";

  const selectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setActiveTab("chat");
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  // real-time label like "10:42 AM"
  const getCurrentTimeLabel = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const sendMessage = () => {
    if (!composerText.trim() || !activeConversation) return;

    const newText = composerText.trim();
    const timeLabel = getCurrentTimeLabel();

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              lastMessagePreview: newText,
              lastActivityMinutesAgo: 0,
              messages: [
                ...c.messages,
                {
                  id: `m-${Date.now()}`,
                  senderId: "me",
                  text: newText,
                  time: timeLabel,
                },
              ],
            }
          : c
      )
    );

    setComposerText("");
  };

  const handleComposerKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMinutesAgo = (mins: number) => `${mins} m`;

  return {
    // state
    activeTab,
    activeConversation,
    teamConversations,
    composerText,

    // actions
    setActiveTab,
    setComposerText,
    pillClasses,
    selectConversation,
    sendMessage,
    handleComposerKeyDown,
    formatMinutesAgo,
  };
};
