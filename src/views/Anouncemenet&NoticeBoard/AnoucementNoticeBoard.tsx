// src/pages/AnnouncementNoticeBoard.tsx

import React from "react";
import { motion } from "framer-motion";
import Notices from "../../components/AnnouncementNotice/Notices";
import MainLayout from "../../components/layout/MainLayout";
import noticeicon from "../../assets/icons/noticeicon.svg";

const AnnouncementNoticeBoard: React.FC = () => {
  return (
    <MainLayout>
      <div className="w-[1469px] mx-auto p-6">
        {/* Header + Back Button */}
        <div className="flex items-center mb-6">
          <button className="text-[18px] font-[500] text-gray-500 border bg-[#FCFCFC] h-[40px] w-[130px] hover:text-gray-700">
            ← Back
          </button>
          <img className="h-[26px] w-[26px] ml-[19px]" src={noticeicon} alt="Notice Icon" />
          <p className="ml-[17px] font-[500]">Announcement / NoticeBoard</p>
        </div>

        {/* Notices Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Notices />
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AnnouncementNoticeBoard;
