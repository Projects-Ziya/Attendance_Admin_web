import emailIcon from "../../assets/profileSettins/email.png";
import passwordIcon from "../../assets/profileSettins/password.png";
import resetIcon from "../../assets/profileSettins/reset.png";
import viewimg from "../../assets/profileSettins/view.png";

// import the mock profile
import { mockProfile } from "../../models/profileSettingsModel/profile.mock";

const PrivacySecuritySection = () => {
  return (
    <section className="w-full max-w-[1469px] min-h-[420px] bg-white shadow rounded-lg px-4 sm:px-6 lg:pl-[53px] lg:pr-[43px]">
      {/* Section Title */}
      <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[400] text-midGray pb-[40px] sm:pb-[50px] lg:pb-[61px] tracking-[1.28px] leading-[16px] pt-[30px] sm:pt-[40px] lg:pt-[45px]">
        Privacy & Security
      </h2>

      {/* Settings List */}
      <div className="flex flex-col gap-[8px]">
        {/* Email */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img
              src={emailIcon}
              alt="Email Icon"
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
            />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
              Email
            </span>
          </div>
          {/* 👇 use mockProfile.email instead of hardcoded string */}
          <span className="text-[13px] sm:text-[14px] font-[400] text-smallGray tracking-[1.28px] pr-[20px] sm:pr-[30px] lg:pr-[40px] leading-[16px]">
            {mockProfile.email}
          </span>
        </div>

        {/* Password */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img
              src={passwordIcon}
              alt="Password Icon"
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
            />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px]">
              Password
            </span>
          </div>
          <div className="flex items-center pr-[20px] sm:pr-[30px] lg:pr-[40px]">
            {/* 👇 use mockProfile.password */}
            <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-[400] pr-[30px] sm:pr-[45px] lg:pr-[60px] text-smallGray tracking-widest leading-[16px]">
              {mockProfile.password}
            </span>
            <img
              src={viewimg}
              alt="View Icon"
              className="w-[18px] h-[10px] sm:w-[20px] sm:h-[10px] lg:w-[22px] lg:h-[10px] object-contain"
            />
          </div>
        </div>

        {/* Reset Password */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img
              src={resetIcon}
              alt="Reset Icon"
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
            />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
              Reset Password
            </span>
          </div>
          <button className="px-[16px] sm:px-[18px] lg:px-[20px] py-[6px] sm:py-[7px] lg:py-[8px] border border-[#00A0E3] text-smallGray rounded-md font-[400] text-[13px] sm:text-[14px] tracking-[1.28px] leading-[16px] mr-[20px] sm:mr-[30px] lg:mr-[40px] hover:bg-gray-100 transition">
            Reset Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrivacySecuritySection;
