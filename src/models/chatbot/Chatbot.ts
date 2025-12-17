// src/model/ChatBot.ts

export type Tab = "chat" | "history" | "team";

export type ParticipantType = "person" | "team";

export interface Participant {
  id: string;
  name: string;
  type: ParticipantType;
  avatarInitials: string; // e.g. "Sj"
  status?: "online" | "offline" | "busy";
}

export interface Message {
  id: string;
  senderId: string; // "me" or participant id
  text: string;
  time: string; // "10:30 AM"
}

export interface Conversation {
  id: string;
  participant: Participant;
  lastMessagePreview: string;
  lastActivityMinutesAgo: number; // 10 -> "10 m"
  unreadCount: number;
  messages: Message[];
}

// --------- MOCK DATA ---------

export const initialConversations: Conversation[] = [
  {
    id: "conv-sarah",
    participant: {
      id: "sarah",
      name: "Sarah Johnson",
      type: "person",
      avatarInitials: "Sj",
      status: "online",
    },
    lastMessagePreview: "Sounds good! See you then",
    lastActivityMinutesAgo: 5,
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        senderId: "sarah",
        text: "Hey! How's the project coming along?",
        time: "10:30 AM",
      },
      {
        id: "m2",
        senderId: "me",
        text: "Going great! Should be done by tomorrow.",
        time: "10:33 AM",
      },
      {
        id: "m3",
        senderId: "sarah",
        text: "Sounds good! See you then",
        time: "10:35 AM",
      },
    ],
  },
  {
    id: "conv-marketing",
    participant: {
      id: "team-marketing",
      name: "Marketing Team",
      type: "team",
      avatarInitials: "MT",
    },
    lastMessagePreview: "Campaign launch tomorrow",
    lastActivityMinutesAgo: 10,
    unreadCount: 8,
    messages: [],
  },
  {
    id: "conv-dev",
    participant: {
      id: "team-dev",
      name: "Development Team",
      type: "team",
      avatarInitials: "DT",
    },
    lastMessagePreview: "Sprint planning completed",
    lastActivityMinutesAgo: 30,
    unreadCount: 12,
    messages: [],
  },
];
