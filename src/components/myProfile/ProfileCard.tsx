// ProfileCard.tsx
import type { FC } from "react";
import type { Profile } from "../../viewmodels/myProfile/useProfile";
import banner from "../../assets/profile-banner.jpg";
import p2 from "../../assets/icons/profile-button.png";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {

const navigate = useNavigate()



  return (
    <div className="bg-[#FCFCFC] border-[#D9D9D9] border-[0.5px] 
    rounded-[10px] overflow-hidden w-full xs:max-w-[320px] md:w-[450px] xl:w-[500px] xl:h-[270px] 
    2xl:w-[400px] 2xl:h-[323px]">
      {/* Cover background */}
      <div className="h-[75px] md:h-[70px] lg:h-[80px] xl:h-[95px] 2xl:h-[106px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${banner})` }}>
        {/* Avatar */}
        <img
          src={
            profile.avatarUrl ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.employeeId}`
          }
          alt={profile.name}
          className="w-[70px] h-[70px] lg:w-20 lg:h-20 xl:w-[88px] xl:h-[88px] 2xl:w-[99px] 2xl:h-[99px] 
          rounded-full border-[2px] 
          border-white absolute left-1/2 top-8 transform -translate-x-1/2 
          lg:top-10 xl:top-12"
        />
      </div>

      {/* Content */}
      <div className="pt-8 lg:pt-[40px] xl:pt-[48px] 2xl:pt-16 pb-3 xl:pb-4 2xl:pb-6 
      flex flex-col items-center font-[400px]">
        <h2 className="text-[16px] 2xl:text-lg font-[500px] 
         text-[#00A0E3]">
          {profile.name}</h2>
        <p className="text-[#4D4D4D] text-[11px] 2xl:text-[12px]">
          {profile.designation}</p>

        <button className="mt-3 px-6 py-[6px] 2xl:mt-4 2xl:px-8 2xl:py-2 
        bg-[#00A0E3] text-[15px] 2xl:text-[16px]
        text-[#FCFCFC] rounded-[5px] hover:bg-sky-700 transition 
        flex font-[400px] tracking-[1px]" onClick={() => navigate("/modifyprofile/Editprofile")}>
          <img src={p2} alt="Edit" className="w-4 h-4 2xl:h-5 2xl:w-5 me-2 mt-[2px]
          flex" />
          Modify Profile
        </button>

        <p className="mt-2 text-[#4D4D4D] text-[11px] 2xl:text-[12px] 
        cursor-pointer hover:underline">
          Go to Employee Dashboard
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
