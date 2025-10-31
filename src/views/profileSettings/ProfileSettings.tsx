import headimg from "../../assets/profileSettins/settings.png";
import MainLayout from "../../components/layout/MainLayout";
import AboutSection from "../../components/profileSettings/AboutSection";
import GeneralSection from "../../components/profileSettings/GeneralSection";
import PrivacySecuritySection from "../../components/profileSettings/PrivacySecuritySection";


function ProfileSettings() {
  return (
    <MainLayout>
      <div className="bg-[#F6F5FA] min-h-screen w-full px-4 sm:px-6 lg:pl-[26px] space-y-3">
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
        <GeneralSection />
        <PrivacySecuritySection />
        <AboutSection/>
      </div>
    </MainLayout>
  );
}

export default ProfileSettings;
