import React, { useEffect, useState } from "react";
import Button from "../common/ui/Button";
import dashicon from "../../assets/images/icons/dashicon.svg";
import Search from "../../assets/images/icons/search.svg";
import bell from "../../assets/images/icons/bell.svg";
import ProfilePopOver from "../header/ProfilePopOver";

const Header: React.FC = () => {
  const [profileImg, setProfileImg] = useState<string>("");
  const [hasNotification, setHasNotification] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/");
        const data = await response.json();
        setProfileImg(data.profileImage);
        setIsOnline(data.is_online);
      } catch (error) {
        console.error("Failed to load profile image:", error);
        setProfileImg("/images/img_profile.png");
        setIsOnline(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://api.example.com/notifications");
        const data = await response.json();
        setHasNotification(data?.unreadCount > 0);
      } catch (error) {
        console.error("Notification fetch error:", error);
        setHasNotification(false);
      }
    };

    fetchNotifications();
  }, []);

   const profileData = {
    name: "Mohan",
    role: "Super admin",
    email: "mohan@exp.com",
    image: "https://via.placeholder.com/80",
    isOnline: true,
  };

  return (
    <header className="w-full bg-header-1  bg-white shadow-[0px_1px_1px_#0000003f]">
      <div className="w-full max-w-[1600px] mx-auto bg-global-25 pl-0 pr-4 sm:pr-6 lg:pl-[36px] py-4 sm:py-5 lg:py-[22px]"> <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4">

        {/* Left Section */}
        <div className="flex flex-row gap-6 items-center w-full lg:w-auto">

          {/* Dashboard Title with Icon and Padding Right 37px */}
          <div className="flex flex-row gap-[4px] justify-start items-center pr-[37px]">
            <img src={dashicon} className="w-[24px] h-[24px]" alt="Dashboard" />
            <span className="text-[14px] text-ziyablack sm:text-[16px] lg:text-[16px] font-normal text-global-2 ml-2 font-['Poppins']">
              Dashboard
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex flex-row items-center w-[290px] h-[34px] shadow-[0px_0px_1px_#0000003f] rounded-[5px] bg-global-25 pl-2 pr-[2px] border border-[#b6b5b5]">
            <div className="flex flex-row gap-2 items-center w-full">
              <img src={Search} className="w-[18px] h-[18px]" alt="Search Icon" />
              <input
                type="text"
                placeholder="Search here"
                className="w-full bg-transparent outline-none text-[12px] sm:text-[13px] lg:text-[14px] text-global-4 placeholder:text-global-4 font-['Poppins']"
              />
            </div>
            <Button
              variant="subprimary"
              size="small"
              className="!w-[66px] !h-[28px] !text-[11px] !leading-[14px] !p-0 !rounded-[5px] !min-w-[0] !min-h-[0]"
            >
              Search
            </Button>

          </div>
        </div>


          <div className="flex flex-row cursor-pointer justify-end items-center gap-3 sm:gap-10">
            {/* Profile */}
        <ProfilePopOver profile={profileData}
      onLogout={() => alert("Logged out")} content={<div></div>}>
            <div className="relative w-fit h-fit">
              <img
                src={profileImg}
                onError={() => setProfileImg("/images/img_profile.png")}
                className="w-[28px] sm:w-[30px] lg:w-[32px] h-[30px] sm:h-[32px] lg:h-[34px] object-cover rounded-full"
                alt="Profile"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-green-500 rounded-full border-[2px] border-white shadow-sm"></span>
              )}
            </div>
        </ProfilePopOver>

        {/* Bell */}
        <div className="relative w-fit cursor-pointer h-fit">
          <img
            src={bell}
            className="w-[22px] sm:w-[22px] lg:w-[17px] h-[20px] sm:h-[20px] lg:h-[20px]"
            alt="Notifications"
          />
          {hasNotification && (
            <span className="absolute top-[1px] right-0 w-[10px] h-[10px] bg-red-500 rounded-full border-[2px] border-white shadow-sm"></span>
          )}
        </div>
      </div>
      </div>
    </div>
    </header >
  );
};

export default Header;
