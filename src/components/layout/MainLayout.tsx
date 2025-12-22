import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ChatBotLauncher from "../chatbot/ChatBotLauncher";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("Overview Cards");

  const handleSidebarItemClick = (item: string) => {
    setSelectedSidebarItem(item);
  };

  return (
    <div className="w-full h-screen bg-[#F6F5FA] flex flex-row overflow-hidden">
  {/* Sidebar */}
  <div className="w-[19.6vw] max-w-[377px] min-w-[220px] h-full flex-shrink-0">
    <Sidebar
      selectedItem={selectedSidebarItem}
      onItemClick={handleSidebarItemClick}
    />
  </div>

  {/* Main Content Area */}
  <div className="flex flex-col flex-1 min-w-0">
    {/* Header (sticky) */}
    <div className="sticky top-0 z-10 bg-[#F6F5FA]">
      <Header />
    </div>

    {/* Scrollable content */}
    <main className="flex-1 pl-5 pr-5 overflow-y-auto">
      {children}
      <ChatBotLauncher/>
    </main>
  </div>
</div>
  );
};

export default MainLayout;
