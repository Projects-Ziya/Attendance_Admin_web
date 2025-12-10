import { useEffect, useState } from "react";
import emailIcon from "../../assets/profileSettins/email.png";
import passwordIcon from "../../assets/profileSettins/password.png";
import resetIcon from "../../assets/profileSettins/reset.png";
import viewimg from "../../assets/profileSettins/view.png";
import api from "../../Api/api";

const PrivacySecuritySection = () => {
  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Fetch real profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/admin-email/"); // <-- replace with your endpoint
        setProfile({
          email: res.data.data.email,
          password: res.data.password, // backend should return encrypted OR masked
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="w-full max-w-[1469px] min-h-[420px] bg-white shadow rounded-lg px-4 sm:px-6 lg:pl-[53px] lg:pr-[43px]">
      <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-[400] text-midGray pb-[40px] sm:pb-[50px] lg:pb-[61px] tracking-[1.28px] leading-[16px] pt-[30px] sm:pt-[40px] lg:pt-[45px]">
        Privacy & Security
      </h2>

      <div className="flex flex-col gap-[8px]">

        {/* Email */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img src={emailIcon} alt="Email Icon" className="w-[19px] h-[19px]" />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px]">
              Email
            </span>
          </div>

          <span className="text-[13px] sm:text-[14px] font-[400] text-smallGray tracking-[1.28px] pr-[40px]">
            {profile.email}
          </span>
        </div>

        {/* Password */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img src={passwordIcon} alt="Password Icon" className="w-[19px] h-[19px]" />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px]">
              Password
            </span>
          </div>

          <div className="flex items-center pr-[40px]">
            {/* 👁 toggle show/hide */}
            <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-[400] pr-[30px] text-smallGray tracking-widest leading-[16px]">
              {showPassword ? profile.password : "••••••••"}
            </span>

            <img
              src={viewimg}
              alt="View Icon"
              className="w-[22px] h-[10px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {/* Reset Password */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg h-[70px] sm:h-[75px] lg:h-[80px] hover:shadow-md transition">
          <div className="flex items-center gap-4 sm:gap-5 pl-[20px] sm:pl-[30px] lg:pl-[40px]">
            <img src={resetIcon} alt="Reset Icon" className="w-[19px] h-[19px]" />
            <span className="text-[13px] sm:text-[14px] font-[400] text-midGray tracking-[1.28px] leading-[16px]">
              Reset Password
            </span>
          </div>

          <button className="px-[20px] py-[8px] border border-[#00A0E3] text-smallGray rounded-md font-[400] text-[14px] mr-[40px] hover:bg-gray-100 transition">
            Reset Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default PrivacySecuritySection;
