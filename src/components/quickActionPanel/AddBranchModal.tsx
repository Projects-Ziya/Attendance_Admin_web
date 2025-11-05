import React, { useState } from "react";
import api from "../../Api/api";

interface AddBranchModalProps {
  onClose: () => void;
  onBranchCreated: (newBranch: any) => void; // 👈 new prop
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({
  onClose,
  onBranchCreated,
}) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      const response = await api.post("/api/create-list-branch/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Branch created successfully!");

      // 👇 Pass new branch data back to parent
      onBranchCreated(response.data);

      onClose();
    } catch (error: any) {
      console.error("Error creating branch:", error);
      alert("Failed to create branch. Please check console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-[1469px] relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
        >
          ×
        </button>

        <div className="mt-8 sm:mt-[58px]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            Add Company Branch
          </h2>
          <p className="text-gray-500 mt-4 sm:mt-9 text-base leading-[24px] tracking-[0.08em]">
            Manage growth with structured branch setup.
          </p>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-10 sm:pt-[80px]">
          {[
            { label: "Branch Name", name: "name", type: "text" },
            { label: "Company ID", name: "company_id", type: "text" },
            { label: "Location", name: "location", type: "text" },
          ].map(({ label, name, type }) => (
            <div className="flex flex-col" key={name}>
              <label className="text-gray-600 mb-2 text-sm font-medium">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

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

          {[
            { label: "Starting Time", name: "starting_time", type: "time" },
            { label: "Closing Time", name: "closing_time", type: "time" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Email", name: "email", type: "email" },
          ].map(({ label, name, type }) => (
            <div className="flex flex-col" key={name}>
              <label className="text-gray-600 mb-2 text-sm font-medium">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={label}
              />
            </div>
          ))}
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
