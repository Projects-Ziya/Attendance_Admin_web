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
      setEmployeeData({ ...data, profile_picture: file });
    }
  };

  return (
    <div className="flex flex-col gap-[10px] mt-[40px]">
      {/* Profile Picture Upload */}
      <div className="flex items-center gap-6 bg-[#F9F6FF] rounded-[5px] h-[211px] pl-[15px]">
        <div className="w-[120px] h-[125px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={data?.profile_picture_url || "https://i.pravatar.cc/150?img=3"}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
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
