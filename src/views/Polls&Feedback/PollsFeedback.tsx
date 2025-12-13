import React, { useState } from "react";
import PollFeedbackBox from "../../components/Polls&Feedback/PollFeedbackBox";
import MainLayout from "../../components/layout/MainLayout";
import pollsicon from "../../assets/icons/pollsfeedback/pollsblueicon.svg";
import { motion } from "framer-motion";
import SubmitResponseTab from "../../components/Polls&Feedback/SubmitResponse";
import { usePollFeedbackViewModel } from "../../viewmodels/PollsFeedback/usePollFeedbackViewModel";

function PollsFeedback() {
  // ✅ Bring form + handlers here so both tabs share the same data
  const {
    form,
    setFormDescription,
    handleAddOption,
    handleEditQuestionText,
    handleEditOption,
    handleSubmitResponse,
  } = usePollFeedbackViewModel();

  const [activeTab, setActiveTab] = useState<"create" | "submit">("create");

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <MainLayout>
      <div className="bg-[#F6F5FA] w-[1469px] sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12">
          <h1 className="flex items-center gap-2 text-midGray text-[16px] leading-[16px] font-[500]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img src={pollsicon} alt="Section icon" className="w-5.5 h-5.5" />
            </span>
            Polls Feedback
          </h1>
        </div>

        {/* Animated container */}
        <motion.div
          className="flex flex-col gap-[30px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={sectionVariants}>
            {/* ✅ TAB SWITCH */}
            {activeTab === "create" ? (
              <PollFeedbackBox
                form={form}
                setFormDescription={setFormDescription}
                handleAddOption={handleAddOption}
                handleEditQuestionText={handleEditQuestionText}
                handleEditOption={handleEditOption}
                onSave={() => setActiveTab("submit")}
              />
            ) : (
              <SubmitResponseTab
  formTitle={form.title}
  formDescription={form.description}
  questions={form.questions}
  handleSubmitResponse={handleSubmitResponse}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>

            )}
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
}

export default PollsFeedback;
