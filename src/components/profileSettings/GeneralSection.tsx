import themeIcon from "../../assets/profileSettins/theme.png";
import languageIcon from "../../assets/profileSettins/language.png";
import statusIcon from "../../assets/profileSettins/status.png";

const GeneralSection = () => {
  return (
    <section className="w-full max-w-[1469px] min-h-[420px] bg-white shadow rounded-lg px-4 sm:px-6 lg:pl-[53px] lg:pr-[43px]">
      {/* Section Title */}
      <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[400] text-midGray pb-[40px] sm:pb-[50px] lg:pb-[61px] tracking-[1.28px] leading-[16px] pt-[30px] sm:pt-[40px] lg:pt-[45px]">
        General
      </h2>

      {/* Settings List */}
      <div className="flex flex-col gap-[8px]">
        {/* Theme */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img
              src={themeIcon}
              alt="Theme Icon"
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
            />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
              Theme
            </span>
          </div>
          <span className="text-[13px] sm:text-[14px] font-[400] text-smallGray tracking-[0.08em] pr-[20px] sm:pr-[30px] lg:pr-[40px] leading-[16px]">
            Light
          </span>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img
              src={languageIcon}
              alt="Language Icon"
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
            />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
              Language
            </span>
          </div>
          <span className="text-[13px] sm:text-[14px] font-[400] text-smallGray tracking-[1.28px] pr-[20px] sm:pr-[30px] lg:pr-[40px] leading-[16px]">
            ENG-IN
          </span>
        </div>

        {/* Account Status */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img
              src={statusIcon}
              alt="Status Icon"
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
            />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
              Account Status
            </span>
          </div>
          <span className="text-[13px] sm:text-[14px] font-[400] text-smallGray tracking-[1.28px] pr-[20px] sm:pr-[30px] lg:pr-[40px] leading-[16px]">
            Active
          </span>
        </div>
      </div>
    </section>
  );
};

export default GeneralSection;
