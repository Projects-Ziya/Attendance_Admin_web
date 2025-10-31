import aboutIcon from "../../assets/profileSettins/AboutApp.svg";
import termsIcon from "../../assets/profileSettins/termsAndConditions.svg";
import privacyIcon from "../../assets/profileSettins/PrivacyPolicy.svg";
import rightArrow from "../../assets/profileSettins/rightArrow.svg";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="w-full max-w-[1469px] min-h-[420px] bg-white shadow rounded-lg px-4 sm:px-6 lg:pl-[53px] lg:pr-[43px]">
      {/* Section Title */}
      <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[400] text-midGray pb-[40px] sm:pb-[50px] lg:pb-[61px] tracking-[1.28px] leading-[16px] pt-[30px] sm:pt-[40px] lg:pt-[45px]">
        About
      </h2>

      {/* About List */}
      <div className="flex flex-col gap-[8px]">
        <Link to={'/AboutUs'}>
          <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
              <img
                src={aboutIcon}
                alt="About App Icon"
                className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
              />
              <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
                About App
              </span>
            </div>
            <img
              src={rightArrow}
              alt="Right Arrow"
              className="w-[8px] h-[12px] sm:w-[9px] sm:h-[13px] lg:w-[10px] lg:h-[14px] object-contain mr-[20px] sm:mr-[30px] lg:mr-[40px]"
            />
          </div>

        </Link>
        {/* Terms & Conditions */}
        <Link to={'/Terms&Conditions'}>
          <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
              <img
                src={termsIcon}
                alt="Terms Icon"
                className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
              />
              <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
                Terms & Conditions
              </span>
            </div>
            <img
              src={rightArrow}
              alt="Right Arrow"
              className="w-[8px] h-[12px] sm:w-[9px] sm:h-[13px] lg:w-[10px] lg:h-[14px] object-contain mr-[20px] sm:mr-[30px] lg:mr-[40px]"
            />
          </div>
        </Link>

        {/* Privacy Policy */}
        <Link to={'/PrivacyPolicy'}>
          <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
              <img
                src={privacyIcon}
                alt="Privacy Icon"
                className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[19px] lg:h-[19px] object-contain"
              />
              <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
                Privacy Policy
              </span>
            </div>
            <img
              src={rightArrow}
              alt="Right Arrow"
              className="w-[8px] h-[12px] sm:w-[9px] sm:h-[13px] lg:w-[10px] lg:h-[14px] object-contain mr-[20px] sm:mr-[30px] lg:mr-[40px]"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
