import React, { useState } from "react";
import Button from "../common/ui/Button";
import Icon from "./AppIcon";
import api from "../../Api/api"; // ✅ Make sure this is correctly imported
import type { Employee } from "../../models/employeeBirthday/Employee";

interface EmployeeCardProps {
  employee: Employee;
  isHighlighted?: boolean;
  showSendWishButton?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  isHighlighted = false,
  showSendWishButton = true,
}) => {
  const [sending, setSending] = useState(false);

  // 🔹 POST API call to send wish for a specific employee
  const handleSendWishes = async () => {
    try {
      setSending(true);
      const response = await api.post(`/api/birthdaystodaywishid/${employee.id}/`);

      if (response?.data?.success) {
        alert(`🎉 Birthday wish sent to ${employee.name}!`);
      } else {
        alert("⚠️ Failed to send wish. Please try again.");
      }
    } catch (error: any) {
      console.error("Error sending wish:", error);
      const errMsg =
      error?.response?.data?.message || 
      error?.message
 alert(errMsg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm border transition-all duration-200 ${
        isHighlighted
          ? "border-2 border-dashed border-[#00A0E3] bg-blue-50/30"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      {/* Profile image */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={employee.profileImage || "/default-avatar.png"}
            alt={employee.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
      </div>

      {/* Employee Info */}
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm">{employee.name}</h3>
        <div className="text-xs text-gray-600">
          <p>{employee.department}</p>
          <p>{employee.position}</p>
        </div>
        <p className="text-xs text-gray-500 font-medium">{employee.birthday}</p>
      </div>

      {/* 🎂 Send Wish Button */}
      {showSendWishButton && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            disabled={sending}
            className={`rounded-lg p-4 items-center border-0 text-[#4D4D4D] shadow w-fit gap-2 ${
              sending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSendWishes}
          >
            <Icon name="Cake" responsive className="text-[#4D4D4D]" />
            {sending ? "Sending..." : "Send Wish"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;