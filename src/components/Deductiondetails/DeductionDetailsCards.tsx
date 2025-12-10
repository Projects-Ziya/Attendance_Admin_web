import React, { useEffect, useState } from "react";
import type { DeductionCard } from "../../models/deduction";
import pficon from "../../assets/icons/deductiondetails/pficon.svg";
import { themeStyles } from "../../viewmodels/deductondetails/useDeductionDetailsVM";
import api from "../../Api/api";
import DeductionEditModal from "./DeductionEditModal";

const DeductionDetailsCards: React.FC = () => {
  const [deductions, setDeductions] = useState<(DeductionCard & { id: number })[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<any>({}); // selected card for edit

  // ------------------------------
  // FETCH ALL DEDUCTIONS
  // ------------------------------
  const fetchDeductions = async () => {
    try {
      const response = await api.get("/api/salary-component-list/");
      const data = response.data.data;

      const mapped = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        rate: item.rate_type === "PERCENTAGE" ? `${item.rate_value}%` : `${item.rate_value}`,
        amount: "",
        description: item.description,
        contribution: item.employee_contribution,
        employerContribution: item.employer_contribution,
        example: item.example_text,

        // 🟢 FIXED: dynamic color theme support
        colorTheme: item.color_theme || "blue",
      }));

      setDeductions(mapped);
    } catch (error) {
      console.error("Failed to fetch deductions:", error);
    }
  };

  useEffect(() => {
    fetchDeductions();
  }, []);

  const handleEdit = (deduction: any) => {
    setFormData(deduction);
    setOpenModal(true);
  };

  return (
    <div className="grid grid-cols-2 gap-[40px] justify-center pb-[40px]">
      {deductions.map((deduction, index) => {
        const theme = themeStyles[deduction.colorTheme] || themeStyles.blue;

        return (
          <div
            key={deduction.id}
            className="w-[700px] h-[607px] border rounded-[10px] shadow-sm flex flex-col"
            style={{ borderColor: theme.borderColor }}
          >
            {/* Header */}
            <div
              className="px-[30px] py-[20px] rounded-t-[10px] flex items-center justify-between"
              style={{ backgroundColor: theme.headerBg }}
            >
              <div className="flex items-center gap-[20px]">
                <span
                  className="rounded-[19px] w-[69px] h-[56px] flex items-center justify-center"
                  style={{ backgroundColor: theme.iconBg }}
                >
                  <img src={pficon} alt="PF Icon" className="w-[25px] h-[17px]" />
                </span>

                <div className="flex flex-col">
                  <h2 className="text-[23px] font-medium text-[#4D4D4D] mb-[4px]">
                    {deduction.title}
                  </h2>
                  <p className="text-[16px]" style={{ color: theme.iconBg }}>
                    Rate: {deduction.rate}
                  </p>
                </div>
              </div>

              <img
                src={theme.editIcon}
                alt="Edit"
                className="w-[32px] h-[32px] cursor-pointer"
                onClick={() => handleEdit(deduction)}
              />
            </div>

            {/* body */}
            <div className="pt-[40px] px-[27px]">
              <h1 className="text-[23px] font-[400] text-[#000000] pb-[12px]">Description</h1>
              <p className="text-[20px] text-[#655D5D] pb-[18px]">{deduction.description}</p>
              <hr className="border-[#DBDBDB] mb-[19px]" />

              <h1 className="text-[20px] text-[#000000]">Employee Contribution</h1>
              <p className="text-[20px] text-[#5C5B5B] mb-[13px]">{deduction.contribution}</p>

              <h1 className="text-[20px] text-[#000000]">Employer Contribution</h1>
              <p className="text-[20px] text-[#5C5B5B] mb-[30px]">
                {deduction.employerContribution}
              </p>

              <div
                className="w-[655px] h-[90px] pl-[29px] pt-[10px] rounded-[20px] mt-[20px]"
                style={{
                  backgroundColor: theme.exampleBg,
                  border: `1px solid ${theme.exampleBorderColor}`,
                }}
              >
                <div className="flex items-center gap-[10px]">
                  <img src={theme.exampleIcon} alt="" />
                  <h2 className="text-[20px] text-[#000000]">Example</h2>
                </div>
                <p className="text-[#707070] text-[18px]">{deduction.example}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* EDIT MODAL */}
      <DeductionEditModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={fetchDeductions}
      />
    </div>
  );
};

export default DeductionDetailsCards;
