import React, { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { PersonalDetailsPayload } from "../../services/employeeService";

interface PersonalDetailsProps {
  data: PersonalDetailsPayload;
  update: (patch: Partial<PersonalDetailsPayload>) => void;
  onBack: () => void;
  onNext: () => void;
}

type Errors = Partial<Record<keyof PersonalDetailsPayload, string>>;

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ 
  data,
  update,
  onBack,
  onNext }) => {

  const [errors, setErrors] = useState<Errors>({});

 const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    update({ [name]: value } as Partial<PersonalDetailsPayload>);
    setErrors((prev) => ({ ...prev, [name as keyof PersonalDetailsPayload]: "" }));
  };

  const validate = (payload: PersonalDetailsPayload) => {
    const newErrors: Errors = {};
    if (!payload.address.trim()) newErrors.address = "Address is required";
    if (!payload.phone.trim()) newErrors.phone = "Phone number is required";
    if (!payload.emergencyPhone.trim())
      newErrors.emergencyPhone = "Emergency number is required";
    if (!payload.gender) newErrors.gender = "Select gender";
    if (!payload.dob) newErrors.dob = "Select date of birth";
    if (!payload.nationality.trim()) newErrors.nationality = "Enter nationality";
    if (!payload.bloodGroup.trim()) newErrors.bloodGroup = "Enter blood group";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const allFilled = useMemo(
    () => Object.values(data).every((v) => v !== "" && v !== null && v !== undefined),
    [data]
  );

   const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate(data)) return;
    onNext();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Full Address
        </label>
        <textarea
          rows={4}
          name="address"
          value={data.address}
          onChange={handleChange}
          className="w-full border text-gray-700 rounded-md px-2 h-[120px]"
        ></textarea>
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+91"
            value={data.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-2 h-[80px] text-gray-700"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Emergency Phone Number
          </label>
          <input
            type="tel"
            name="emergencyPhone"
            placeholder="+91"
            value={data.emergencyPhone}
            onChange={handleChange}
            className="w-full border  rounded-md px-2 h-[80px] text-gray-700"
          />
          {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            className="w-full border  rounded-md text-gray-600 px-2 h-[60px] "
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={data.dob}
            onChange={handleChange}
            className="w-full border rounded-md text-gray-600 px-2 h-[60px] "
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            value={data.nationality}
            onChange={handleChange}
            className="w-full border  rounded-md  px-2 h-[60px] text-gray-700 "
          />
          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Blood Group
          </label>
          <input
            type="text"
            name="bloodGroup"
            value={data.bloodGroup}
            onChange={handleChange}
            className="w-full border  rounded-md  px-2 h-[60px] text-gray-700"
          />
          {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-1 border rounded-md text-sm"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!allFilled}
          className={`px-5 py-1 text-white rounded-md text-sm ${allFilled ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default PersonalDetails;
