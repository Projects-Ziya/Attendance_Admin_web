interface EditPersonalDetailsProps {
  data: any;
  setEmployeeData: (data: any) => void;
}

function EditPersonalDetails({ data, setEmployeeData }: EditPersonalDetailsProps) {
  const handleChange = (e: any) => {
    setEmployeeData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col mt-[20px] gap-6">
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">
          Full Address
        </label>
        <input
          type="text"
          name="address"
          value={data?.address || ""}
          onChange={handleChange}
          className="mt-1 block w-full h-[146px] border-[1px] border-[#D9D9D9] rounded-md p-4"
        />
      </div>

      {/* Phone Number */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px]">
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={data?.phone || ""}
            onChange={handleChange}
            placeholder="+91"
            className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-4"
          />
        </div>

        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Emergency Phone Number
          </label>
          <input
            type="tel"
            name="emergency_contact"
            value={data?.emergency_contact || ""}
            onChange={handleChange}
            placeholder="+91"
            className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-4"
          />
        </div>
      </div>

      {/* Gender, DOB, Nationality, Blood Group */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Gender
          </label>
          <select
            name="gender"
            value={data?.gender || ""}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-4"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Date Of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={data?.dob || ""}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-4"
          />
        </div>

        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            value={data?.nationality || ""}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          />
        </div>

        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Blood Group
          </label>
          <input
            type="text"
            name="blood_group"
            value={data?.blood_group || ""}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          />
        </div>
      </div>
    </div>
  );
}

export default EditPersonalDetails;
