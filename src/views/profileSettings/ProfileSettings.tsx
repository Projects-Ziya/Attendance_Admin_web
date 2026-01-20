import { motion } from "framer-motion";
import headimg from "../../assets/profileSettins/settings.png";
import MainLayout from "../../components/layout/MainLayout";
import AboutSection from "../../components/profileSettings/AboutSection";
import GeneralSection from "../../components/profileSettings/GeneralSection";
import PrivacySecuritySection from "../../components/profileSettings/PrivacySecuritySection";

// Animation variants


function ProfileSettings() {

  const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1]
 } }
};
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

  return (
    <MainLayout>
      <motion.div
        className="bg-[#F6F5FA] px-4 sm:px-6 lg:pl-[37px] pr-[37px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      <motion.div className="bg-[#F6F5FA] min-h-screen w-full mb-[30px] px-4 sm:px-6 lg:pl-[26px] space-y-3" variants={itemVariants}>
        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 ">
          <h1 className="flex items-center gap-2 text-gray-600 text-[15px] sm:text-[16px] font-[500] leading-[1.3] tracking-[1.28px]">
            <span className="bg-[#DAF1FB] rounded-full w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] flex items-center justify-center">
              <img
                src={headimg}
                alt="Section icon"
                className="w-[27px] h-[25px] sm:w-[27px] sm:h-[25.64px] object-contain"
              />
            </span>
            Profile Settings
          </h1>
        </div>
          <motion.div  variants={sectionVariants}>
        <GeneralSection />
        </motion.div>
          <motion.div variants={sectionVariants}>
        <PrivacySecuritySection />
        </motion.div>
         <motion.div variants={sectionVariants}>
        <AboutSection/>
        </motion.div>
      </motion.div>
      </motion.div>
    </MainLayout>
  );
}

export default ProfileSettings;
