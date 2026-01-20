// src/components/modifyProfile/EditBasicDetails.tsx
import { useRef } from "react";
import EmployeeForm from "./EmployeeForm";

interface EditBasicDetailsProps {
  data: any;
  setEmployeeData: (data: any) => void;
}

function EditBasicDetails({ data, setEmployeeData }: EditBasicDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      setEmployeeData({ ...data, profile_pic: file });
    }
  };
  

 const getProfileImage = () => {
  if (!data?.profile_pic) {
    console.log("No profile_pic found, using fallback image.");
    return "https://i.pravatar.cc/150?img=3";
  }

  // If user uploaded a new file
  if (data.profile_pic instanceof File) {
    return URL.createObjectURL(data.profile_pic);
  }

  // If backend returns a full URL
  if (typeof data.profile_pic === "string") {
    if (data.profile_pic.startsWith("http")) return data.profile_pic;

    // If it's a relative path
    const relativePath = data.profile_pic.startsWith("/")
      ? data.profile_pic
      : `/${data.profile_pic}`;
    return `https://attendance.ziyaacademy.co.in${relativePath}`;
  }

  console.warn("profile_pic value is invalid:", data.profile_pic);
  return "https://i.pravatar.cc/150?img=3";
};

    console.log("Rendering profile image:", getProfileImage());


  return (
    <div className="flex flex-col gap-[10px] mt-[40px]">
      {/* Profile Picture Upload */}
      <div className="flex items-center gap-6 bg-[#F9F6FF] rounded-[5px] h-[211px] pl-[15px]">
        <div className="w-[120px] h-[125px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={getProfileImage()}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://i.pravatar.cc/150?img=3";
            }}
          />
        </div>

        <div className="flex flex-col pl-[58px]">
          <h2 className="text-[18px] font-[600] mb-[15px] text-[#4D4D4D]">
            Upload Profile Picture
          </h2>
          <p className="text-[16px] text-[#909090] mb-[20px]">
            Image should be below 4 mb
          </p>
          <div className="flex gap-[15px]">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              className="px-6 py-2 bg-[#00A0E3] text-white rounded-[5px] text-[16px]"
              onClick={handleUpload}
            >
              Upload
            </button>
            <button className="px-6 py-2 border-[1px] border-[#D9D9D9] text-[#4D4D4D] rounded-[5px] text-[16px]">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <EmployeeForm data={data} setEmployeeData={setEmployeeData} />
    </div>
  );
}

export default EditBasicDetails;
