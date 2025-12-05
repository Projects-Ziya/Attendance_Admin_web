import React from "react";
import api from "../../Api/api"; // <-- added for API call

type Props = {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    title: string;
      id: string | number;  
    rate: string;
    description: string;
    contribution: string;
    employerContribution: string;
    example: string;
    colorTheme: string;
  };
  setFormData: (data: any) => void;
  onSave: () => void;
};

const DeductionEditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
}) => {
  if (!isOpen) return null;

  // --------------------------
  // PATCH API CALL
  // --------------------------
  const handleSave = async () => {
    try {
      await api.patch(`/api/salary-component-update/${formData.id}/`, {
        title: formData.title,
        rate_type: "PERCENTAGE",
        rate_value: formData.rate.replace("%", ""),
        description: formData.description,
        employee_contribution: formData.contribution,
        employer_contribution: formData.employerContribution,
        example_text: formData.example,
      });

      console.log("PATCH SUCCESS");
      onSave(); // keep original behavior
    } catch (error) {
      console.error("PATCH FAILED:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-[14px] shadow-lg p-8">
        
        {/* Header */}
        <h2 className="text-[24px] font-semibold text-[#4D4D4D] mb-6">
          Edit Deduction
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border p-3 rounded-lg text-[16px] w-full"
          />

          <input
            type="text"
            placeholder="Rate"
            value={formData.rate}
            onChange={(e) =>
              setFormData({ ...formData, rate: e.target.value })
            }
            className="border p-3 rounded-lg text-[16px] w-full"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border p-3 rounded-lg text-[16px] w-full h-[80px]"
          />

          <input
            type="text"
            placeholder="Employee Contribution"
            value={formData.contribution}
            onChange={(e) =>
              setFormData({ ...formData, contribution: e.target.value })
            }
            className="border p-3 rounded-lg text-[16px] w-full"
          />

          <input
            type="text"
            placeholder="Employer Contribution"
            value={formData.employerContribution}
            onChange={(e) =>
              setFormData({
                ...formData,
                employerContribution: e.target.value,
              })
            }
            className="border p-3 rounded-lg text-[16px] w-full"
          />

          <textarea
            placeholder="Example"
            value={formData.example}
            onChange={(e) =>
              setFormData({ ...formData, example: e.target.value })
            }
            className="border p-3 rounded-lg text-[16px] w-full h-[80px]"
          />

          {/* Color Theme Selector */}
          <select
            value={formData.colorTheme}
            onChange={(e) =>
              setFormData({ ...formData, colorTheme: e.target.value })
            }
            className="border p-3 rounded-lg text-[16px] w-full"
          >
            <option value="blue">Blue Theme</option>
            <option value="green">Green Theme</option>
            <option value="orange">Orange Theme</option>
            <option value="red">Red Theme</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}  
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeductionEditModal;
