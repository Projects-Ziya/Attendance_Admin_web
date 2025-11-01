import React, { useState } from "react";
import api from "../../Api/api";

interface AddBranchModalProps {
  onClose: () => void;
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    starting_time: "",
    closing_time: "",
    phone: "",
    email: "",
    company_id: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("address", formData.address);
      data.append("starting_time", formData.starting_time);
      data.append("closing_time", formData.closing_time);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("company_id", formData.company_id);

      console.log("Payload being sent:", Object.fromEntries(data.entries()));

      const response = await api.post("/api/create-list-branch/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Branch created successfully:", response.data);
      alert("Branch created successfully!");
      onClose();
    } catch (error: any) {
      console.error("Error creating branch:", error);
      console.log("Error response data:", error.response?.data);
      alert("Failed to create branch. Please check console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-[1469px] relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
        >
          ×
        </button>

        {/* Header */}
        <div className="mt-8 sm:mt-[58px]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            Add Company Branch
          </h2>
          <p className="text-gray-500 mt-4 sm:mt-9 text-base leading-[24px] tracking-[0.08em]">
            Manage growth with structured branch setup.
          </p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-10 sm:pt-[80px]">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Branch Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter branch name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Company ID
            </label>
            <input
              type="text"
              name="company_id"
              value={formData.company_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter company ID (e.g. CMP100)"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter location"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter address"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Starting Time
            </label>
            <input
              type="time"
              name="starting_time"
              value={formData.starting_time}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Closing Time
            </label>
            <input
              type="time"
              name="closing_time"
              value={formData.closing_time}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
            />
          </div>
        </form>

        <div className="flex justify-end mt-10">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-white border border-blue-500 text-blue-500 px-6 py-2.5 rounded-md font-medium hover:bg-blue-500 hover:text-white transition-all duration-200"
          >
            Create Branch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBranchModal;
