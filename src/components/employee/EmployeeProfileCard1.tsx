import React, { useEffect, useState } from "react";
// import axios from "axios";
import Fingerprint from "../../../src/assets/fingerprint.svg";
import userImg from "../../../src/assets/user.jpg";

interface ProfileData {
  name: string;
  status: string;
  timestamp: string;
  role: string;
  punchInTime: string;
  productionTime: string;
}


const EmployeeProfileCard: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
// Uncomment this when connect to backend
        // const response = await axios.get("/api/profile-summary");    // replace with the real api route
        // setProfileData(response.data);

        await new Promise((res) => setTimeout(res, 500)); //delay
        setProfileData(mockProfileData);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profileData) return <p>No profile data available.</p>;

  return (
    <div
      className="
        w-full max-w-[329px] 
        h-auto sm:h-[447px] max-h-[447px] 
        bg-white shadow rounded-lg 
        flex flex-col items-center text-center 
        p-4
      "
    >
      {/* Header */}
      <div className="text-left w-full">
        <h3 className="font-medium text-[clamp(12px,1.5vw,16px)] flex items-center gap-2 text-[#909090]">
          {profileData.name}
          <span className="text-[#94C21A] font-normal text-[clamp(10px,1.2vw,14px)]">
            {profileData.status}
          </span>
        </h3>
        <p className="text-[clamp(12px,2vw,20px)] font-medium text-[#4D4D4D] mt-1 truncate">
          {profileData.timestamp}
        </p>
      </div>

      {/* Profile_ImG*/}
      <img
        src={userImg}
        alt="Profile"
        className="
          w-[clamp(80px,100%,180px)] 
          h-[clamp(80px,100%,180px)] 
          rounded-full object-cover my-3
        "
      />

      {/* RoleS*/}
      <p className="text-[#FD7F20] font-medium mt-1 text-[clamp(10px,1.5vw,14px)] truncate">
        {profileData.role}
      </p>

      {/* Punch_In */}
      <p className="flex items-center justify-center gap-2 text-[#4d4d4d] mt-2 font-medium text-[clamp(12px,2vw,18px)] truncate">
        <img
          src={Fingerprint}
          alt="Clock"
          className="w-[clamp(14px,2vw,20px)] h-[clamp(14px,2vw,20px)]"
        />
        Punch In at {profileData.punchInTime}
      </p>

      {/* Production_Time */}
      <div
        className="
          w-full max-w-[249px] 
          h-[clamp(28px,8vw,38px)] 
          mt-4 bg-[#00A0E3] 
          text-white rounded-md 
          flex items-center justify-center 
          font-medium text-[clamp(12px,2vw,16px)] 
          truncate
        "
      >
        Production time: {profileData.productionTime}
      </div>
    </div>
  );
};

export default EmployeeProfileCard;
