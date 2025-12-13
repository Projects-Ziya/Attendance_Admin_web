// src/pages/AnnouncementNoticeBoard.tsx

import React from "react";
import { motion } from "framer-motion";
import Notices from "../../components/AnnouncementNotice/Notices";
import MainLayout from "../../components/layout/MainLayout";
import noticeicon from "../../assets/icons/bluenoticeicon.svg";

const AnnouncementNoticeBoard: React.FC = () => {
  return (
    <MainLayout>
     <div className="bg-[#F6F5FA] mb-[50px] w-[1469px] sm:px-4 lg:px-6">
        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12">
          <h1 className="flex items-center gap-2 text-[#4D4D4D] text-[16px] leading-[16px] font-[500]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img src={noticeicon} className="w-5.5 h-5.5 object-contain" />
            </span>
            Announcement & NoticeBoard
          </h1>
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
